const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); // We need the Profile model
// Note: We'll need a way to get the logged-in user. We'll add 'auth' middleware later.
// For now, we'll pretend we got the user's ID.

// @route   GET api/matching
// @desc    Find best mentors for the logged-in student
// @access  Private (Needs user to be logged in)
router.get('/', async (req, res) => {
  try {
    // --- THIS IS A PLACEHOLDER ---
    // We need the user's ID to find their profile.
    // In a real app, 'req.user.id' would come from a JWT token.
    // Let's hardcode a student's ID for testing.
    // IMPORTANT: You'll replace this later.
    const studentProfile = await Profile.findOne({ user: 'STUDENT_USER_ID_HERE' });
    
    // For a real app, you would use:
    // const studentProfile = await Profile.findOne({ user: req.user.id });

    if (!studentProfile) {
      return res.status(404).json({ msg: 'Please complete your profile first.' });
    }

    // 2. Find all available mentors (alumni)
    const mentors = await Profile.find({ isAvailableToMentor: true });

    // 3. Calculate match score for each mentor
    const scoredMentors = mentors.map(mentor => {
      let score = 0;

      // Add points for shared skills
      mentor.skills.forEach(skill => {
        if (studentProfile.skills.includes(skill)) {
          score += 10;
        }
      });

      // Add points for shared interests
      mentor.interests.forEach(interest => {
        if (studentProfile.interests.includes(interest)) {
          score += 5;
        }
      });

      // Add points for same academic background
      if (mentor.academicBackground === studentProfile.academicBackground) {
        score += 3;
      }

      // Return an object with all mentor details and their score
      return {
        score,
        profile: mentor 
      };
    });

    // 4. Sort mentors by highest score
    const sortedMentors = scoredMentors.sort((a, b) => b.score - a.score);

    res.json(sortedMentors);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
