const mongoose = require('mongoose');

// 2. The detailed User Profile (for matching)
const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullName: { type: String },
  academicBackground: { type: String }, // e.g., "B.Tech ECE"
  industry: { type: String }, // e.g., "Software Engineering"
  careerAspirations: { type: String }, // For students
  skills: [{ type: String }], // e.g., ['JavaScript', 'Python', 'Public Speaking']
  interests: [{ type: String }], // e.g., ['AI', 'Startups', 'Design']
  isAvailableToMentor: { type: Boolean, default: false } // For alumni
});

module.exports = mongoose.model('Profile', profileSchema);
