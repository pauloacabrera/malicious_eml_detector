import { FiAlertTriangle, FiCheckCircle, FiShield, FiMail, FiClock } from 'react-icons/fi';

function AnalysisResults({ result }) {
  if (!result) return null;

  const threatTone = result.threat_level === 'High' ? 'danger' : result.threat_level === 'Medium' ? 'warning' : 'safe';

  return (
    <div className="glass-card results-card">
      <div className="panel-head">
        <h3>Analysis Results</h3>
        <span className={`status-chip ${threatTone}`}>{result.threat_level || 'Unknown'}</span>
      </div>

      <div className="results-grid">
        <div className="result-section">
          <h4><FiMail /> Email Details</h4>
          <p><strong>Sender:</strong> {result.sender || 'Unknown'}</p>
          <p><strong>Recipient:</strong> {result.recipient || 'Unknown'}</p>
          <p><strong>Subject:</strong> {result.subject || 'No subject'}</p>
          <p><strong>Date:</strong> {result.date || 'Unknown'}</p>
        </div>

        <div className="result-section">
          <h4><FiShield /> Security Checks</h4>
          <p><strong>SPF:</strong> {result.spf_status || 'Unknown'}</p>
          <p><strong>DKIM:</strong> {result.dkim_status || 'Unknown'}</p>
          <p><strong>DMARC:</strong> {result.dmarc_status || 'Unknown'}</p>
        </div>
      </div>

      <div className="result-section">
        <h4><FiAlertTriangle /> Threat Analysis</h4>
        <div className="keyword-list">
          {(result.suspicious_keywords || []).map((keyword) => (
            <span key={keyword} className="keyword-pill">{keyword}</span>
          ))}
        </div>
        <p><strong>Threat Score:</strong> {result.risk_score || 0}</p>
        <p><strong>Threat Level:</strong> {result.threat_level || 'Unknown'}</p>
        <p><strong>Verdict:</strong> {result.verdict || 'Unknown'}</p>
      </div>

      <div className="summary-banner">
        {result.verdict === 'Malicious' ? <FiAlertTriangle /> : <FiCheckCircle />}
        <span>{result.verdict || 'Analysis complete'}</span>
      </div>
    </div>
  );
}

export default AnalysisResults;
