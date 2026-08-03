import { FiBell, FiSearch, FiShield } from 'react-icons/fi';

function TopBar({ user }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Enterprise Security Platform</p>
        <h2>Threat Intelligence Overview</h2>
      </div>

      <div className="topbar-actions">
        <label className="search-box">
          <FiSearch />
          <input placeholder="Search reports" />
        </label>
        <button className="icon-btn"><FiBell /></button>
        <div className="status-pill"><FiShield /> Secure</div>
      </div>
    </header>
  );
}

export default TopBar;
