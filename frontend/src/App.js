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
    <div className="App">
      <h1>YouTube Clone</h1>
      <form onSubmit={handleUpload} style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="file"
          accept="video/*"
          onChange={e => setFile(e.target.files[0])}
          required
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      <h2>Videos</h2>
      <div>
        {videos.length === 0 && <p>No videos uploaded yet.</p>}
        {videos.map(video => (
          <div key={video._id} style={{ marginBottom: 32 }}>
            <h3>{video.title}</h3>
            <video width="480" controls>
              <source src={`${API_URL}/videos/${video.filename}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>Uploaded: {new Date(video.uploadDate).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
