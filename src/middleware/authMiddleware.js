const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware function to protect routes
// This acts as a gatekeeper: it runs BEFORE the actual controller logic
const protect = async (req, res, next) => {
  let token;

  // 1. Check if the "Authorization" header exists and starts with "Bearer"
  // Example header: "Authorization: Bearer eyJhbGciOiJIUzI1..."
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
        // 2. Extract the token from the header string
      // split(' ') turns "Bearer <token>" into ["Bearer", "<token>"]
      // [1] grabs the actual token part
      token = req.headers.authorization.split(' ')[1];
      // 3. Verify the token
      // Checks if the token is valid, not expired, and created with OUR secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // 4. Find the user in the database associated with this token
      // "decoded.id" comes from the payload we created in generateToken
      // .select('-password') ensures we DON'T return the password field for security
      req.user = await User.findById(decoded.id).select('-password');
      // 5. Grant Access
      // next() tells Express to move on to the next function (the actual route controller)
      next();
    } catch (error) {
      console.error(error);
      // If token is expired or fake, send 401 Unauthorized error
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  
// 6. Check if no token was found at all
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
