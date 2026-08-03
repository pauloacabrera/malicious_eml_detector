const fs = require('fs/promises');
const path = require('path');
const { analyzeEmlContent } = require('./emlAnalyzerClient');
const { saveScanResult, getScanHistory, getDashboardStats } = require('../models/scanModel');

async function processUpload({ file, userId }) {
  if (!file) {
    throw new Error('No file uploaded');
  }

  const extension = path.extname(file.originalname).toLowerCase();
  if (extension !== '.eml') {
    throw new Error('Only .eml files are allowed');
  }

  const content = await fs.readFile(file.path, 'utf8');
  const analysis = await analyzeEmlContent({
    eml_content: content,
    filename: file.originalname
  });

  const scanId = await saveScanResult({
    userId,
    filename: file.originalname,
    verdict: analysis.verdict || 'Unknown',
    riskScore: analysis.risk_score || 0,
    threatLevel: analysis.threat_level || 'Safe'
  });

  await fs.unlink(file.path).catch(() => {});

  return {
    scanId,
    analysis
  };
}

async function getScansForUser(userId) {
  return getScanHistory(userId);
}

async function getDashboardStatsForUser(userId) {
  return getDashboardStats(userId);
}

module.exports = {
  processUpload,
  getScansForUser,
  getDashboardStatsForUser
};
