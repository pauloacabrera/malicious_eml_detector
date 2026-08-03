import { useEffect, useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import StatusBadge from '../components/StatusBadge';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
} from 'chart.js';
import { FiAlertTriangle, FiCheckCircle, FiShield, FiZap, FiActivity } from 'react-icons/fi';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const defaultAnalytics = {
  totalScans: 0,
  safeEmailCount: 0,
  suspiciousEmailCount: 0,
  maliciousEmailCount: 0,
  averageThreatScore: 0,
  latestAnalyzedEmails: [],
  threatLevelBreakdown: { low: 0, medium: 0, high: 0 },
  scanActivity: []
};

function Dashboard({ user, onLogout, onNavigate, token }) {
  const [analytics, setAnalytics] = useState(defaultAnalytics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return undefined;
    }

    let isMounted = true;

    const loadAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Unable to load dashboard analytics');
        }

        if (isMounted) {
          setAnalytics(data.analytics || defaultAnalytics);
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAnalytics();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const threatDistributionData = useMemo(() => ({
    labels: ['Safe', 'Suspicious', 'Malicious'],
    datasets: [{
      data: [analytics.safeEmailCount, analytics.suspiciousEmailCount, analytics.maliciousEmailCount],
      backgroundColor: ['#4ade80', '#fbbf24', '#fb7185'],
      borderColor: 'rgba(255,255,255,0.2)',
      borderWidth: 1
    }]
  }), [analytics]);

  const threatLevelData = useMemo(() => ({
    labels: ['Low', 'Medium', 'High'],
    datasets: [{
      label: 'Threat Levels',
      data: [analytics.threatLevelBreakdown.low, analytics.threatLevelBreakdown.medium, analytics.threatLevelBreakdown.high],
      backgroundColor: ['#4ade80', '#fbbf24', '#fb7185'],
      borderRadius: 8
    }]
  }), [analytics]);

  const scanActivityData = useMemo(() => ({
    labels: analytics.scanActivity.map((item) => item.label),
    datasets: [{
      label: 'Scans',
      data: analytics.scanActivity.map((item) => item.count),
      borderColor: '#67e8f9',
      backgroundColor: 'rgba(103, 232, 249, 0.22)',
      tension: 0.35,
      fill: true
    }]
  }), [analytics]);

  return (
    <div className="app-shell">
      <Sidebar user={user} onLogout={onLogout} activeView="dashboard" onNavigate={onNavigate} />

      <main className="main-content">
        <TopBar user={user} />

        <section className="hero-panel">
          <div>
            <p className="eyebrow">Operations Summary</p>
            <h3>Welcome back, {user?.username || 'Analyst'}</h3>
            <p>Your secured threat monitoring workspace is ready for review.</p>
          </div>
          <button className="primary-btn" onClick={() => onNavigate('upload')}>Analyze New Email</button>
        </section>

        <section className="cards-grid">
          <article className="glass-card stat-card">
            <div className="card-icon"><FiShield /></div>
            <div>
              <h4>Total Emails Scanned</h4>
              <p>{loading ? '…' : analytics.totalScans}</p>
            </div>
          </article>
          <article className="glass-card stat-card">
            <div className="card-icon safe"><FiCheckCircle /></div>
            <div>
              <h4>Safe Emails</h4>
              <p>{loading ? '…' : analytics.safeEmailCount}</p>
            </div>
          </article>
          <article className="glass-card stat-card">
            <div className="card-icon warning"><FiAlertTriangle /></div>
            <div>
              <h4>Suspicious Emails</h4>
              <p>{loading ? '…' : analytics.suspiciousEmailCount}</p>
            </div>
          </article>
          <article className="glass-card stat-card">
            <div className="card-icon danger"><FiZap /></div>
            <div>
              <h4>Malicious Emails</h4>
              <p>{loading ? '…' : analytics.maliciousEmailCount}</p>
            </div>
          </article>
          <article className="glass-card stat-card">
            <div className="card-icon"><FiActivity /></div>
            <div>
              <h4>Average Threat Score</h4>
              <p>{loading ? '…' : `${analytics.averageThreatScore.toFixed(1)} / 100`}</p>
            </div>
          </article>
        </section>

        {error ? <p className="muted">{error}</p> : null}

        <section className="content-grid">
          <article className="glass-card panel-card">
            <div className="panel-head">
              <h3>Latest Analyzed Emails</h3>
              <StatusBadge tone="safe">Live</StatusBadge>
            </div>
            <ul className="activity-list">
              {analytics.latestAnalyzedEmails.length > 0 ? analytics.latestAnalyzedEmails.map((item) => (
                <li key={item.id}>
                  <span>{item.filename}</span>
                  <small>{item.verdict} · {item.threat_level} · {item.risk_score}/100</small>
                </li>
              )) : <li><span>No scans yet</span><small>Upload an email to populate analytics.</small></li>}
            </ul>
          </article>

          <article className="glass-card panel-card">
            <div className="panel-head">
              <h3>Threat Distribution</h3>
              <StatusBadge tone="warning">Overview</StatusBadge>
            </div>
            <div className="chart-wrap">
              <Doughnut data={threatDistributionData} options={{ plugins: { legend: { labels: { color: '#f8fafc' } } } }} />
            </div>
          </article>
        </section>

        <section className="content-grid dashboard-charts">
          <article className="glass-card panel-card">
            <div className="panel-head">
              <h3>Threat Level Bar Chart</h3>
              <StatusBadge tone="safe">Levels</StatusBadge>
            </div>
            <div className="chart-wrap">
              <Bar data={threatLevelData} options={{ plugins: { legend: { display: false } }, scales: { y: { ticks: { color: '#e2e8f0' }, grid: { color: 'rgba(255,255,255,0.08)' } }, x: { ticks: { color: '#e2e8f0' }, grid: { display: false } } } }} />
            </div>
          </article>

          <article className="glass-card panel-card">
            <div className="panel-head">
              <h3>Scan Activity</h3>
              <StatusBadge tone="warning">Trend</StatusBadge>
            </div>
            <div className="chart-wrap">
              <Line data={scanActivityData} options={{ plugins: { legend: { labels: { color: '#f8fafc' } } }, scales: { y: { ticks: { color: '#e2e8f0' }, grid: { color: 'rgba(255,255,255,0.08)' } }, x: { ticks: { color: '#e2e8f0' }, grid: { display: false } } } }} />
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
