/*const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { validationResult } = require('express-validator');

// --- 1. REGISTER USER ---
// Access: Public
// Goal: Create a new account and log them in
const registerUser = async (req, res) => {
  // Check for validation errors from express-validator (e.g., invalid email format)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, phone } = req.body;

  try {
    // Check database to see if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create the new user in the database
    // We set 'isVerified: true' to simplify the process (skips email OTP verification for now)
    const user = await User.create({
      name,
      email,
      password, // This will be automatically hashed by your User Model middleware
      phone,
      isVerified: true
    });

    // If creation was successful, send back the user data AND a new token
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id) // "Digital ID Card" created here
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 2. LOGIN USER ---
// Access: Public
// Goal: Authenticate existing user and issue a token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email.
    // .select('+password') is CRITICAL here. By default, your Schema hides the password.
    // We explicitly ask for it so we can compare it below.
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists AND if the password matches
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id) // Issue a new token for this session
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 3. GET CURRENT USER ---
// Access: Private (Requires Token)
// Goal: specific endpoint to reload user data (e.g., when you refresh the page)
const getMe = async (req, res) => {
  try {
    // req.user._id comes from the 'protect' middleware that ran BEFORE this function
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getMe };*/