import React, { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await fetch(`${API_URL}/videos`);
    const data = await res.json();
    setVideos(data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('video', file);
    await fetch(`${API_URL}/videos`, {
      method: 'POST',
      body: formData,
    });
    setTitle('');
    setFile(null);
    setUploading(false);
    fetchVideos();
  };

  return (
    <div className="ytc-root">
      <header className="ytc-header">
        <span className="ytc-logo">🎬</span>
        <h1>YouTube Clone</h1>
      </header>
      <main className="ytc-main">
        <form className="ytc-upload-form" onSubmit={handleUpload}>
          <input
            className="ytc-input"
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            className="ytc-input"
            type="file"
            accept="video/*"
            onChange={e => setFile(e.target.files[0])}
            required
          />
          <button className="ytc-btn" type="submit" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        <h2 className="ytc-section-title">Videos</h2>
        <div className="ytc-video-list">
          {videos.length === 0 && <p className="ytc-empty">No videos uploaded yet.</p>}
          {videos.map(video => (
            <div key={video._id} className="ytc-video-card">
              <video className="ytc-video" controls poster="/logo192.png">
                <source src={`${API_URL}/videos/${video.filename}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="ytc-video-info">
                <h3 className="ytc-video-title">{video.title}</h3>
                <p className="ytc-video-date">Uploaded: {new Date(video.uploadDate).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="ytc-footer">&copy; {new Date().getFullYear()} YouTube Clone Demo</footer>
    </div>
  );
}

export default App;
