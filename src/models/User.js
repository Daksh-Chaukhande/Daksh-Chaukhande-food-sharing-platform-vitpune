const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//--- 1. THE BLUEPRINT (SCHEMA) ---
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
    // Regex to ensure the email format is valid (e.g., user@example.com)
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    // 'select: false' prevents the password from being sent to the frontend when fetching user
    select: false
  },
  phone: {
    type: String,
    default: ''
  },
  // Fields for the Food Sharing Map integration
  location: {
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    address: { type: String, default: '' }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    default: null
  },
  // Preferences for food donation alerts
  notificationPreferences: {
    enabled: { type: Boolean, default: true },
    maxDistance: { type: Number, default: 10 },
    foodTypes: [String]
  }
}, {
  timestamps: true  // Automatically adds 'createdAt' and 'updatedAt'
});
// --- 2. SECURITY MIDDLEWARE (HASHING) ---
// This runs automatically BEFORE saving a user to the database
// Hash password before saving
userSchema.pre('save', async function(next) {
    // If password wasn't changed, skip hashing to prevent errors
  if (!this.isModified('password')) {
    next();
  }
  // Generate a "salt" (random data) and hash the password with it
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
    
// --- 3. LOGIN METHOD ---
// Helper function to check if the entered password matches the hashed one
// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
