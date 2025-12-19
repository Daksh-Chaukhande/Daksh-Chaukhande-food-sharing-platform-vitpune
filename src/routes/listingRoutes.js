const { listingLimiter } = require('../middleware/security');
const express = require('express');
const multer = require('multer');  // Library for handling file uploads
const path = require('path');  // Node.js built-in library for handling file paths
const { createListing, getListings, getListing, deleteListing } = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');
const { listingValidation, validate } = require('../middleware/validation');

const router = express.Router();

// --- 1. MULTER CONFIGURATION (Storage) ---
// This defines WHERE to store files and HOW to name them
const storage = multer.diskStorage({
    // Destination: Files will be saved in the 'uploads/' folder in your project root
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Filename: We rename files to prevent duplicates
  // format: <timestamp>-<original_name> (e.g., 163456789-food.jpg)
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// --- 2. UPLOAD SETTINGS ---
// This initializes the upload middleware with rules
const upload = multer({ 
  storage: storage,
  // Limit file size to 5MB (5 * 1024 * 1024 bytes) to save server space
  limits: { fileSize: 5 * 1024 * 1024 },
  // Filter: Only allow specific image types
  fileFilter: function (req, file, cb) {
    // Regex to check allowed extensions
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});

// --- 3. ROUTES ---

// POST /api/listings - With validation
router.post('/', 
  protect,
  listingLimiter, 
  upload.array('images', 5),
  listingValidation,
  validate,
  createListing
);


// GET /api/listings
// Public: Anyone can see available food
router.get('/', getListings);

// GET /api/listings/:id
// Public: Get details of a single food item
router.get('/:id', getListing);
// DELETE /api/listings/:id
// Private: User must be logged in to delete (Controller should also check if they own it)
router.delete('/:id', protect, deleteListing);

module.exports = router;
