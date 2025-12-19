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
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    select: false
  },
  phone: {
    type: String,
    default: ''
  },
  location: {
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    address: { type: String, default: '' }
  },
  notificationPreferences: {
    enabled: { type: Boolean, default: true },
    maxDistance: { type: Number, default: 10 },
    foodTypes: [String]
  }
}, {
  timestamps: true
});

// --- 2. SECURITY MIDDLEWARE (HASHING) ---
// Hash password before saving (modern async/await - no next() needed)
userSchema.pre('save', async function() {
  // Only hash if password was modified
  if (!this.isModified('password')) {
    return;
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// --- 3. LOGIN METHOD ---
// Method to compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
