import './styles.css';

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>EML Detector</h1>
        <p>Cybersecurity dashboard</p>
        <nav>
          <a href="#">Dashboard</a>
          <a href="#">Upload EML</a>
          <a href="#">Reports</a>
          <a href="#">Settings</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h2>Threat Intelligence Overview</h2>
          <button>Analyze New EML</button>
        </header>

        <section className="cards">
          <article className="card">
            <h3>Total Scans</h3>
            <p>0</p>
          </article>
          <article className="card">
            <h3>Safe</h3>
            <p>0</p>
          </article>
          <article className="card">
            <h3>Suspicious</h3>
            <p>0</p>
          </article>
          <article className="card">
            <h3>Malicious</h3>
            <p>0</p>
          </article>
        </section>
      </main>
    </div>
  );
}

export default App;
