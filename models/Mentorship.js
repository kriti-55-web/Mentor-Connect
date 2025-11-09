const mongoose = require('mongoose');

// 3. The Mentorship Connection
const mentorshipSchema = new mongoose.Schema({
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'active', 'completed'], default: 'pending' },
  startDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mentorship', mentorshipSchema);
