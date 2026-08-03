const oracledb = require('oracledb');
const { getOracleConnection } = require('../config/oracle');

async function saveScanResult({ userId, filename, verdict, riskScore, threatLevel }) {
  const connection = await getOracleConnection();
  try {
    const result = await connection.execute(
      `INSERT INTO email_scans (user_id, filename, verdict, risk_score, threat_level)
       VALUES (:userId, :filename, :verdict, :riskScore, :threatLevel)
       RETURNING id INTO :scanId`,
      {
        userId,
        filename,
        verdict,
        riskScore,
        threatLevel,
        scanId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      },
      { autoCommit: true }
    );

    return result.outBinds.scanId[0];
  } finally {
    await connection.close();
  }
}

async function getScanHistory(userId) {
  const connection = await getOracleConnection();
  try {
    const result = await connection.execute(
      `SELECT id, filename, verdict, risk_score, threat_level, scanned_at
       FROM email_scans
       WHERE user_id = :userId
       ORDER BY scanned_at DESC`,
      { userId }
    );

    return result.rows.map((row) => ({
      id: row[0],
      filename: row[1],
      verdict: row[2],
      risk_score: row[3],
      threat_level: row[4],
      scanned_at: row[5]
    }));
  } finally {
    await connection.close();
  }
}

async function getDashboardStats(userId) {
  const connection = await getOracleConnection();
  try {
    const summaryResult = await connection.execute(
      `SELECT
         COUNT(*) AS total_scans,
         SUM(CASE WHEN LOWER(verdict) = 'safe' THEN 1 ELSE 0 END) AS safe_count,
         SUM(CASE WHEN LOWER(verdict) = 'suspicious' THEN 1 ELSE 0 END) AS suspicious_count,
         SUM(CASE WHEN LOWER(verdict) = 'malicious' THEN 1 ELSE 0 END) AS malicious_count,
         AVG(risk_score) AS average_score
       FROM email_scans
       WHERE user_id = :userId`,
      { userId }
    );

    const levelResult = await connection.execute(
      `SELECT
         SUM(CASE WHEN LOWER(threat_level) = 'low' THEN 1 ELSE 0 END) AS low_count,
         SUM(CASE WHEN LOWER(threat_level) = 'medium' THEN 1 ELSE 0 END) AS medium_count,
         SUM(CASE WHEN LOWER(threat_level) = 'high' THEN 1 ELSE 0 END) AS high_count
       FROM email_scans
       WHERE user_id = :userId`,
      { userId }
    );

    const activityResult = await connection.execute(
      `SELECT TO_CHAR(TRUNC(scanned_at), 'YYYY-MM-DD') AS activity_date, COUNT(*) AS scan_count
       FROM email_scans
       WHERE user_id = :userId
         AND scanned_at >= TRUNC(SYSDATE) - 6
       GROUP BY TRUNC(scanned_at)
       ORDER BY TRUNC(scanned_at)`,
      { userId }
    );

    const latestResult = await connection.execute(
      `SELECT id, filename, verdict, risk_score, threat_level, scanned_at
       FROM (
         SELECT id, filename, verdict, risk_score, threat_level, scanned_at
         FROM email_scans
         WHERE user_id = :userId
         ORDER BY scanned_at DESC
       )
       WHERE ROWNUM <= 5`,
      { userId }
    );

    const summaryRow = summaryResult.rows[0];
    const levelRow = levelResult.rows[0];
    const totalScans = Number(summaryRow[0] || 0);
    const safeEmailCount = Number(summaryRow[1] || 0);
    const suspiciousEmailCount = Number(summaryRow[2] || 0);
    const maliciousEmailCount = Number(summaryRow[3] || 0);
    const averageThreatScore = Number(summaryRow[4] || 0);

    const threatLevelBreakdown = {
      low: Number(levelRow[0] || 0),
      medium: Number(levelRow[1] || 0),
      high: Number(levelRow[2] || 0)
    };

    const scanActivity = [];
    const lastSevenDays = [];
    for (let index = 6; index >= 0; index -= 1) {
      const date = new Date();
      date.setDate(date.getDate() - index);
      lastSevenDays.push(date.toISOString().slice(0, 10));
    }

    const activityMap = new Map((activityResult.rows || []).map((row) => [row[0], Number(row[1] || 0)]));
    lastSevenDays.forEach((day) => {
      scanActivity.push({ label: day, count: activityMap.get(day) || 0 });
    });

    return {
      totalScans,
      safeEmailCount,
      suspiciousEmailCount,
      maliciousEmailCount,
      averageThreatScore: Number(averageThreatScore.toFixed(1)),
      latestAnalyzedEmails: latestResult.rows.map((row) => ({
        id: row[0],
        filename: row[1],
        verdict: row[2],
        risk_score: row[3],
        threat_level: row[4],
        scanned_at: row[5]
      })),
      threatLevelBreakdown,
      scanActivity
    };
  } finally {
    await connection.close();
  }
}

module.exports = {
  saveScanResult,
  getScanHistory,
  getDashboardStats
};
