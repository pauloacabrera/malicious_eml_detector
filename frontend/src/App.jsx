import { useEffect, useState } from 'react';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import './styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('login');
  const [view, setView] = useState('dashboard');
  const [token, setToken] = useState(() => localStorage.getItem('eml_token') || '');

  useEffect(() => {
    const savedToken = localStorage.getItem('eml_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      setUser({ username: 'analyst' });
    }
  }, []);

  const handleAuthSuccess = (data) => {
    if (data.token) {
      setToken(data.token);
      setIsAuthenticated(true);
      setUser({ username: data.username || 'analyst' });
      setView('dashboard');
    } else {
      setMode('login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('eml_token');
    setToken('');
    setIsAuthenticated(false);
    setUser(null);
    setMode('login');
  };

  if (isAuthenticated) {
    if (view === 'upload') {
      return <UploadPage user={user} onBack={() => setView('dashboard')} token={token} />;
    }

    return <Dashboard user={user} onLogout={handleLogout} onNavigate={setView} token={token} />;
  }

  return (
    <div className="auth-switcher">
      <button className="switch-btn" onClick={() => setMode('login')}>Login</button>
      <button className="switch-btn" onClick={() => setMode('register')}>Register</button>
      <AuthPage mode={mode} onAuthSuccess={handleAuthSuccess} />
    </div>
  );
}

export default App;
