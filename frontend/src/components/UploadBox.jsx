import { FiUploadCloud, FiFileText } from 'react-icons/fi';

function UploadBox({ file, error, loading, onFileSelect, onUpload }) {
  const onDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      onFileSelect(droppedFile);
    }
  };

  return (
    <div className="glass-card upload-card">
      <div
        className={`dropzone ${file ? 'ready' : ''}`}
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
      >
        <FiUploadCloud size={30} />
        <h3>Drop your .eml file here</h3>
        <p>Securely inspect inbound messages for phishing indicators and suspicious content.</p>
        <label className="primary-btn upload-label">
          <input type="file" accept=".eml" onChange={(event) => onFileSelect(event.target.files?.[0])} />
          Choose EML File
        </label>
      </div>

      {file && (
        <div className="selected-file-card">
          <div className="selected-file-icon"><FiFileText /></div>
          <div>
            <strong>{file.name}</strong>
            <p>{(file.size / 1024).toFixed(1)} KB</p>
          </div>
        </div>
      )}

      {error && <p className="upload-error">{error}</p>}

      <button className="primary-btn upload-action" onClick={onUpload} disabled={loading || !file}>
        {loading ? 'Scanning…' : 'Upload and Analyze'}
      </button>
    </div>
  );
}

export default UploadBox;
