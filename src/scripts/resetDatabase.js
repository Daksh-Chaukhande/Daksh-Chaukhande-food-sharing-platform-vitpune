require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const FoodListing = require('../models/FoodListing');

const resetDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Delete all users
    const usersDeleted = await User.deleteMany({});
    console.log(`🗑️  Deleted ${usersDeleted.deletedCount} users`);

    // Delete all food listings
    const listingsDeleted = await FoodListing.deleteMany({});
    console.log(`🗑️  Deleted ${listingsDeleted.deletedCount} listings`);

    console.log('✅ Database reset complete!');
    console.log('💡 You can now start fresh testing!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting database:', error.message);
    process.exit(1);
  }
};

resetDatabase();
