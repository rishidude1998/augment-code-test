# YouTube Clone (MERN Stack)

A simple YouTube clone built with the MERN stack (MongoDB, Express, React, Node.js). This app allows users to upload, list, and play videos directly in the browser.

## Features
- Upload video files with a title
- List all uploaded videos with their titles and upload dates
- Play any uploaded video in the browser

## Folder Structure
```
backend/    # Express server, MongoDB models, video upload logic
frontend/   # React app for the UI
```

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running locally

### Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the backend server:
   ```
   node server.js
   ```
   The server will run on http://localhost:5000

### Frontend Setup
1. Open another terminal and navigate to the frontend folder:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the React app:
   ```
   npm start
   ```
   The app will open at http://localhost:3000

## Usage
- Open http://localhost:3000 in your browser.
- Use the form to upload videos.
- Uploaded videos will appear in a list and can be played directly in the browser.

## Notes
- Uploaded video files are stored in `backend/uploads/` (excluded from git).
- Make sure MongoDB is running before starting the backend server.

## License
This project is for educational/demo purposes.