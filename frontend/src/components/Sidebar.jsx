import { FiBarChart2, FiShield, FiClock, FiFileText, FiUser, FiLogOut, FiUploadCloud } from 'react-icons/fi';

function Sidebar({ user, onLogout, activeView, onNavigate }) {
  const items = [
    { label: 'Dashboard', icon: <FiBarChart2 /> },
    { label: 'Upload Email', icon: <FiUploadCloud /> },
    { label: 'Scan History', icon: <FiClock /> },
    { label: 'Threat Reports', icon: <FiFileText /> },
    { label: 'Profile', icon: <FiUser /> }
  ];

  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-icon"><FiShield /></div>
        <div>
          <h1>EML Detector</h1>
          <p>Security Command Center</p>
        </div>
      </div>

      <div className="profile-card">
        <div className="avatar">{(user?.username || 'A').charAt(0).toUpperCase()}</div>
        <div>
          <strong>{user?.username || 'Analyst'}</strong>
          <p>Operations Access</p>
        </div>
      </div>

      <nav className="nav-list">
        {items.map((item, index) => {
          const label = item.label;
          const isActive = activeView === (label === 'Dashboard' ? 'dashboard' : label === 'Upload Email' ? 'upload' : 'dashboard');

          return (
            <button
              key={index}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                if (label === 'Dashboard') onNavigate('dashboard');
                if (label === 'Upload Email') onNavigate('upload');
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <button className="logout-btn" onClick={onLogout}>
        <FiLogOut /> Logout
      </button>
    </aside>
  );
}

export default Sidebar;
