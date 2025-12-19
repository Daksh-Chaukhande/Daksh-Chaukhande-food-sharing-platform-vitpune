const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { registerValidation, loginValidation, validate } = require('../middleware/validation');

// POST /api/auth/register
// Description: Register new user with validation
// Access: Public
router.post('/register', 
  registerValidation,
  validate,
  registerUser
);

// POST /api/auth/login
// Description: Login user with validation
// Access: Public
router.post('/login', 
  loginValidation,
  validate,
  loginUser
);

// GET /api/auth/me
// Description: Get current logged-in user's profile
// Access: Private (requires token)
router.get('/me', protect, getMe);

module.exports = router;
