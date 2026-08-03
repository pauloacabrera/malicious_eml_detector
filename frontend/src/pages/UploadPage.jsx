import { useState } from 'react';
import UploadBox from '../components/UploadBox';
import AnalysisResults from '../components/AnalysisResults';
import { FiShield } from 'react-icons/fi';

function UploadPage({ user, onBack, token }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const validateFile = (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.name.toLowerCase().endsWith('.eml')) {
      setError('Please select a valid .eml file.');
      return;
    }
    if (selectedFile.size > 2 * 1024 * 1024) {
      setError('File is too large. Maximum size is 2 MB.');
      return;
    }

    setError('');
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please choose a file first.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      if (!token) {
        throw new Error('Authentication token missing. Please log in again.');
      }

      const response = await fetch('http://localhost:5000/api/scans', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setResult(data.analysis);
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-icon"><FiShield /></div>
          <div>
            <h1>EML Detector</h1>
            <p>Upload & Analyze</p>
          </div>
        </div>

        <div className="profile-card">
          <div className="avatar">{(user?.username || 'A').charAt(0).toUpperCase()}</div>
          <div>
            <strong>{user?.username || 'Analyst'}</strong>
            <p>Secure Mail Analysis</p>
          </div>
        </div>

        <button className="primary-btn" onClick={onBack}>Back to Dashboard</button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Threat Analysis Workspace</p>
            <h2>EML Upload and Review</h2>
          </div>
        </header>

        <div className="content-grid upload-layout">
          <UploadBox file={file} error={error} loading={loading} onFileSelect={validateFile} onUpload={handleUpload} />
          <AnalysisResults result={result} />
        </div>
      </main>
    </div>
  );
}

export default UploadPage;
