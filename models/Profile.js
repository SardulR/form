// backend/models/Profile.js
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  domain: String,
  instaUrl: { type: String, default: '' },
  linkedinUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  behanceUrl: { type: String, default: '' },
  year: String,
  image: { type: String, default: '' }
});

module.exports = mongoose.model('Profile', ProfileSchema);
