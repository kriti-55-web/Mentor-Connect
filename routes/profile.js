const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
// const auth = require('../middleware/auth'); // We will build this later

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', async (req, res) => {
  try {
    // --- THIS IS A PLACEHOLDER ---
    // We need the user's ID to find their profile.
    // In a real app, 'req.user.id' would come from a JWT auth token.
    // Let's hardcode a user's ID for testing.
    // IMPORTANT: You'll replace this later.
    const hardcodedUserId = 'YOUR_TEST_USER_ID_HERE'; // Replace this ID

    // The real code would be:
    // const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['fullName', 'email']);

    // Our temporary code:
    const profile = await Profile.findOne({ user: hardcodedUserId }).populate('user', ['email']);

    if (!profile) {
      return res.status(404).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Update a user profile
// @access  Private
router.post('/', async (req, res) => {
  // Destructure the fields from the request body
  const {
    fullName,
    academicBackground,
    industry,
    careerAspirations,
    skills,
    interests,
    isAvailableToMentor
  } = req.body;

  // Build the profile fields object
  const profileFields = {};
  
  // --- THIS IS A PLACEHOLDER ---
  // The real code would use 'req.user.id' from the auth token
  const hardcodedUserId = 'YOUR_TEST_USER_ID_HERE'; // Replace this ID
  profileFields.user = hardcodedUserId;
  // --- End Placeholder ---

  if (fullName) profileFields.fullName = fullName;
  if (academicBackground) profileFields.academicBackground = academicBackground;
  if (industry) profileFields.industry = industry;
  if (careerAspirations) profileFields.careerAspirations = careerAspirations;
  if (isAvailableToMentor) profileFields.isAvailableToMentor = isAvailableToMentor;

  // For skills and interests, we expect a comma-separated string
  // The frontend can send 'JavaScript,Python,HTML'
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }
  if (interests) {
    profileFields.interests = interests.split(',').map(interest => interest.trim());
  }

  try {
    // Find the profile by the user ID and update it
    let profile = await Profile.findOneAndUpdate(
      { user: hardcodedUserId }, // Find profile by user ID
      { $set: profileFields }, // Set the new fields
      { new: true, upsert: true } // Return the new doc, and create if it doesn't exist
    );

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
