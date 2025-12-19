const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// ====================================
// RATE LIMITER FOR AUTH ROUTES
// ====================================
// Prevents brute-force login/registration attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Allow 5 requests per 15 minutes
  message: {
    success: false,
    message: 'Too many login/register attempts. Please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  // Skip successful requests from counting
  skipSuccessfulRequests: false
});

// ====================================
// RATE LIMITER FOR LISTING CREATION
// ====================================
// Prevents spam listing creation
const listingLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // Allow 3 listings per minute
  message: {
    success: false,
    message: 'Too many listings created. Please wait a minute before creating more.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// ====================================
// GENERAL API RATE LIMITER
// ====================================
// Prevents API abuse
const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Allow 100 requests per minute
  message: {
    success: false,
    message: 'Too many requests from this IP. Please slow down.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// ====================================
// EXPORT SECURITY MIDDLEWARE
// ====================================
module.exports = {
  authLimiter,
  listingLimiter,
  generalLimiter,
  helmet
};
