// backend/server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const Profile = require('./models/Profile'); // Import the Profile model

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = 'mongodb+srv://<shardul>:<hello>@cluster0.xxla4.mongodb.net/<db_name>?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Ensure 'uploads' directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// POST route for profile data
app.post('/api/profiles', upload.single('image'), async (req, res) => {
  const { name, domain, instaUrl, linkedinUrl, githubUrl, behanceUrl, year } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newProfile = new Profile({
      name,
      domain,
      instaUrl: instaUrl === 'none' ? '' : instaUrl,
      linkedinUrl: linkedinUrl === 'none' ? '' : linkedinUrl,
      githubUrl: githubUrl === 'none' ? '' : githubUrl,
      behanceUrl: behanceUrl === 'none' ? '' : behanceUrl,
      year,
      image
    });

    await newProfile.save();

    res.status(200).json({ message: 'Profile saved successfully!' });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Error saving profile.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
