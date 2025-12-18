const FoodListing = require('../models/FoodListing');

// Check and remove expired listings
const checkExpiredListings = async () => {
  try {
    const now = new Date();
    
    // Find all expired listings
    const expiredListings = await FoodListing.find({
      status: 'available',
      expiryDateTime: { $lt: now } // Less than current time
    });
    
    if (expiredListings.length > 0) {
      // Update status to expired (or delete them)
      await FoodListing.updateMany(
        { 
          status: 'available',
          expiryDateTime: { $lt: now }
        },
        { 
          $set: { status: 'expired' }
        }
      );
      
      console.log(`✅ Marked ${expiredListings.length} listings as expired`);
      
      // Optional: Delete expired listings completely
      // await FoodListing.deleteMany({ status: 'expired' });
    }
  } catch (error) {
    console.error('❌ Error checking expired listings:', error.message);
  }
};

// Check listings expiring in next 2 hours (for notifications)
const getExpiringSoon = async () => {
  try {
    const now = new Date();
    const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    
    const expiringSoon = await FoodListing.find({
      status: 'available',
      expiryDateTime: {
        $gte: now,
        $lte: twoHoursLater
      }
    }).populate('donorId', 'name email');
    
    return expiringSoon;
  } catch (error) {
    console.error('Error getting expiring listings:', error);
    return [];
  }
};

module.exports = { checkExpiredListings, getExpiringSoon };
