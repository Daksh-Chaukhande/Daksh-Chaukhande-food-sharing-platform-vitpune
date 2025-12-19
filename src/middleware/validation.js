const { body, validationResult } = require('express-validator');

// ====================================
// REGISTRATION VALIDATION RULES
// ====================================
const registerValidation = [
  // Name validation
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters'),

  // Email validation
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .normalizeEmail(),

  // Password validation
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain uppercase, lowercase, and number'),

  // Optional: Location validation
  body('location.address')
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage('Address is too long')
];

// ====================================
// LOGIN VALIDATION RULES
// ====================================
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),

  body('password')
    .notEmpty().withMessage('Password is required')
];

// ====================================
// FOOD LISTING VALIDATION RULES
// ====================================
const listingValidation = [
  // Title validation
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 100 }).withMessage('Title must be 3-100 characters'),

  // Description validation
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10, max: 500 }).withMessage('Description must be 10-500 characters'),

  // Food type validation
  body('foodType')
    .notEmpty().withMessage('Food type is required')
    .isIn(['Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Cooked Food', 'Packaged Food', 'Other'])
    .withMessage('Invalid food type'),

  // Quantity validation
  body('quantity')
    .notEmpty().withMessage('Quantity is required')
    .isLength({ min: 1, max: 50 }).withMessage('Quantity description too long'),

  // Expiry date validation
  body('expiryDateTime')
    .notEmpty().withMessage('Expiry date and time is required')
    .isISO8601().withMessage('Invalid date format')
    .custom((value) => {
      const expiryDate = new Date(value);
      const now = new Date();
      
      if (expiryDate <= now) {
        throw new Error('Expiry date must be in the future');
      }
      
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 30);
      
      if (expiryDate > maxDate) {
        throw new Error('Expiry date cannot be more than 30 days in the future');
      }
      
      return true;
    }),

  // Pickup location validation
  body('pickupLocation.address')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 }).withMessage('Address must be 5-200 characters'),

  body('pickupLocation.lat')
    .optional()
    .isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),

  body('pickupLocation.lng')
    .optional()
    .isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),

  // Dietary info validation
  body('dietaryInfo')
    .optional()
    .isArray().withMessage('Dietary info must be an array'),

  // Allergens validation
  body('allergens')
    .optional()
    .isArray().withMessage('Allergens must be an array')
];

// ====================================
// VALIDATION RESULT CHECKER
// ====================================
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  
  next();
};

// ====================================
// EXPORT ALL VALIDATION MIDDLEWARE
// ====================================
module.exports = {
  registerValidation,
  loginValidation,
  listingValidation,
  validate
};
