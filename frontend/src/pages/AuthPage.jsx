import { useEffect, useState } from 'react';
import AuthForm from '../components/AuthForm';
import { FiShield, FiCpu, FiActivity } from 'react-icons/fi';

function AuthPage({ mode, onAuthSuccess }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('');
  }, [mode]);

  const handleSubmit = async (form) => {
    setLoading(true);
    setMessage('');

    try {
      const endpoint = mode === 'register'
        ? 'http://localhost:5000/api/auth/register'
        : 'http://localhost:5000/api/auth/login';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (mode === 'login' && data.token) {
        localStorage.setItem('eml_token', data.token);
      }

      onAuthSuccess(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-hero">
          <div className="hero-badge"><FiShield /> Enterprise Security Platform</div>
          <h1>Malicious EML Detector</h1>
          <p>Analyze suspicious emails, detect phishing threats, and protect your organization with a professional security operations workflow.</p>
          <div className="hero-points">
            <div><FiCpu /> Advanced threat analysis</div>
            <div><FiActivity /> Real-time risk visibility</div>
          </div>
        </div>
        <AuthForm mode={mode} onSubmit={handleSubmit} loading={loading} />
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AuthPage;
