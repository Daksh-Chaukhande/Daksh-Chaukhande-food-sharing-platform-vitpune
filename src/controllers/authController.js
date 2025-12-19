const crypto = require('crypto');
const { sendVerificationEmail } = require('../utils/sendEmail');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { validationResult } = require('express-validator');

// --- 1. REGISTER USER ---
// Access: Public
// Goal: Create a new account and log them in
// Register new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists' 
      });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user with verification token
    const user = await User.create({
      name,
      email,
      password,
      isVerified: false,
      verificationToken
    });

    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail registration if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      },
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};


// --- 2. LOGIN USER ---
// Access: Public
// Goal: Authenticate existing user and issue a token
// Login user
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
        token: generateToken(user._id)  // Issue a new token for this session
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
// Get current user
const getMe = async (req, res) => {
  try {
    // req.user._id comes from the 'protect' middleware that ran BEFORE this function
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Verify email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find user with this token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.json({
        success: true,
        message: 'Email already verified!'
      });
    }

    // Update user
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully! You can now create food listings.'
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



module.exports = { registerUser, loginUser, getMe, verifyEmail  };


/*Key Concepts Explained
registerUser (Sign Up)

Validation: It first checks if there are any errors (like an invalid email) caught by express-validator.

Duplicate Check: It asks the database, "Do we already have someone with this email?" to prevent duplicate accounts.

Creation: It creates the user. Notice it sets isVerified: true immediately. This is a shortcut for your project so you don't have to build a complex email verification system (OTP) right away.

Token: It immediately gives them a token so they are logged in the moment they sign up.

loginUser (Sign In)

select('+password'): This is a very important line. Remember in your User Model (Schema) we wrote select: false for the password? That hides the password by default. Here, we force Mongoose to give us the password temporarily because we need it to check if the user typed the correct one.

matchPassword: It uses the method you wrote in the User Model to compare the typed password vs. the hashed database password.

getMe (Profile)

req.user._id: This relies on the protect middleware we discussed earlier. The middleware verified the token and attached the user to the request. This function just grabs that data and sends it back. */