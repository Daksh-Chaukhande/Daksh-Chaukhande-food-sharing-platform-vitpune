const mongoose = require('mongoose');

const foodListingSchema = new mongoose.Schema({
    // --- 1. RELATIONSHIPS ---
  // Links this listing to the User who posted it
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  // --- 2. CATEGORIZATION (ENUMS) ---
  // 'enum' forces the user to pick exactly one of these options
foodType: {
  type: String,
  required: true,
  enum: ['Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Cooked Food', 'Packaged Food', 'Other']
},

  quantity: {
    type: String,
    required: [true, 'Please specify quantity']
  },
  // --- 3. EXPIRY & SAFETY ---
  // Critical for filtering out spoiled food from the feed
  expiryDateTime: {
    type: Date,
    required: [true, 'Please specify expiry date and time'],
    index: true
  },
  dietaryInfo: [String],
  allergens: [String],
  images: [String],
  // --- 4. GEOLOCATION ---
  // Required for placing the donation pin on the map
  pickupLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'expired'],
    default: 'available'
  },
  // Tracks who claimed the food (initially null)
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true
});

foodListingSchema.index({ status: 1, expiryDateTime: 1 });

module.exports = mongoose.model('FoodListing', foodListingSchema);
