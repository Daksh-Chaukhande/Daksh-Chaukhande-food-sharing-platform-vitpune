const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules for registration
const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Validation rules for login
const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// Route: POST /api/auth/register
// Description: Register a new user
// Access: Public
router.post('/register', registerValidation, registerUser);

// Route: POST /api/auth/login
// Description: Login user and get token
// Access: Public
router.post('/login', loginValidation, loginUser);

// Route: GET /api/auth/me
// Description: Get current logged-in user's profile
// Access: Private (requires token)
router.get('/me', protect, getMe);

module.exports = router;
