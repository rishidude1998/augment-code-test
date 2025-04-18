const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/youtube_clone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Video schema
const videoSchema = new mongoose.Schema({
  title: String,
  filename: String,
  uploadDate: { type: Date, default: Date.now },
});
const Video = mongoose.model('Video', videoSchema);

// Multer setup for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Upload video endpoint
app.post('/api/videos', upload.single('video'), async (req, res) => {
  const { title } = req.body;
  const video = new Video({ title, filename: req.file.filename });
  await video.save();
  res.json(video);
});

// List videos endpoint
app.get('/api/videos', async (req, res) => {
  const videos = await Video.find().sort({ uploadDate: -1 });
  res.json(videos);
});

// Serve video files
app.get('/api/videos/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.sendFile(filePath);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});