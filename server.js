const express = require('express');
const mongoose = require('mongoose');

// Initialize the app
const app = express();

// --- 1. Connect to your MongoDB Database ---
// We'll use a local database for now.
// Replace 'mentorconnect' with your preferred database name.
const dbURI = 'mongodb://localhost:27017/mentorconnect';

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.log('MongoDB connection error:', err));

// --- 2. Middleware ---
// This tells Express to automatically parse JSON in request bodies
app.use(express.json());

// --- 3. Define Your API Routes ---
// This tells the server to use your 'users.js' file
// for any URL that starts with '/api/users'
app.use('/api/users', require('./routes/users'));

// For '/api/matching'
app.use('/api/matching', require('./routes/matching'));

// For '/api/profile'
app.use('/api/profile', require('./routes/profile'));

// --- 4. Start the Server ---
const PORT = process.env.PORT || 5000; // Use port 5000 by default

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
