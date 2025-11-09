const jwt = require('jsonwebtoken');
const config = require('config');

// This is the middleware function
module.exports = function(req, res, next) {
  // 1. Get token from the header
  const token = req.header('x-auth-token');

  // 2. Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    // 4. Add user from the token payload to the request object
    req.user = decoded.user;
    next(); // Call next() to move on to the next piece of middleware
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
