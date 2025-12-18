const User = require('../models/User');
const FoodListing = require('../models/FoodListing');

// Get all user emails for notification
const getUserEmailsForNotification = async (req, res) => {
  try {
    const { listingId } = req.params;
    
    // Get the listing
    const listing = await FoodListing.findById(listingId)
      .populate('donorId', 'location');
    
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    
    // Get all verified users except the donor
    const users = await User.find({
      isVerified: true,
      _id: { $ne: listing.donorId._id } // Exclude donor
    }).select('name email location notificationPreferences');
    
    // Filter users based on preferences
    const eligibleUsers = users.filter(user => {
      // Check if notifications enabled
      if (!user.notificationPreferences.enabled) return false;
      
      // Check distance preference (if user has location set)
      if (user.location.latitude && user.location.longitude) {
        const calculateDistance = require('../utils/calculateDistance');
        const distance = calculateDistance(
          user.location.latitude,
          user.location.longitude,
          listing.pickupLocation.latitude,
          listing.pickupLocation.longitude
        );
        
        if (distance > user.notificationPreferences.maxDistance) {
          return false;
        }
      }
      
      return true;
    });
    
    // Return email list with user details
    const emailData = eligibleUsers.map(user => ({
      email: user.email,
      name: user.name
    }));
    
    res.json({
      listing: {
        id: listing._id,
        title: listing.title,
        pickupLocation: listing.pickupLocation
      },
      recipients: emailData,
      count: emailData.length
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserEmailsForNotification };
