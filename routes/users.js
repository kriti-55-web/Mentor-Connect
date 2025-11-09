const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // For password hashing
const User = require('../models/User'); // Import your User model
const Profile = require('../models/Profile'); // Import your Profile model

// @route   POST api/users/register
// @desc    Register a new user
// @access  Public

router.post('/login', async (req, res) => {
  try {
    const { email, password }s = req.body;

    // 1. Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 2. Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 3. User is valid.
    // We will create and send a JSON Web Token (JWT) here
    // so the user stays logged in.
    // For now, we'll just send a success message.
    res.json({ msg: 'User logged in successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // 2. Create the new User
    user = new User({
      email,
      password,
      role
    });

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Save the User
    await user.save();

    // 5. Create an empty Profile for them
    const profile = new Profile({
      user: user.id, // Link to the new user's ID
      fullName: "" // User will update this later
    });

    await profile.save();

    // 6. Link the profile to the user
    user.profile = profile.id;
    await user.save();
    
    // We'll send a JSON Web Token (JWT) here later for login
    res.status(201).json({ msg: 'User registered successfully!' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
