const mongoose = require('mongoose');

// 4. The Goal Tracker
const goalSchema = new mongoose.Schema({
  mentorship: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentorship' },
  description: { type: String, required: true },
  status: { type: String, enum: ['todo', 'inProgress', 'done'], default: 'todo' }
});

module.exports = mongoose.model('Goal', goalSchema);
