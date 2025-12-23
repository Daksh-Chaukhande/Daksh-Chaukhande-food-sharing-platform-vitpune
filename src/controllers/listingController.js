const FoodListing = require('../models/FoodListing');
const User = require('../models/User');
const calculateDistance = require('../utils/calculateDistance');


// --- 1. CREATE LISTING ---
// Access: Private
const createListing = async (req, res) => {
  try {
    // Check if user is verified
    const user = await User.findById(req.user._id);
    
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before creating listings',
        requiresVerification: true
      });
    }
    
    let imagePaths = [];
    if (req.files) {
      imagePaths = req.files.map(file => file.path);
    }


    // Handle both form-data and JSON
    let pickupLocation;
    if (req.body.pickupLocation) {
      pickupLocation = typeof req.body.pickupLocation === 'string' 
        ? JSON.parse(req.body.pickupLocation)
        : req.body.pickupLocation;
    } else {
      pickupLocation = {
        latitude: parseFloat(req.body.latitude),
        longitude: parseFloat(req.body.longitude),
        address: req.body.address
      };
    }


    const listing = await FoodListing.create({
      donorId: req.user._id,
      title: req.body.title,
      description: req.body.description,
      foodType: req.body.foodType,
      quantity: req.body.quantity,
      expiryDateTime: req.body.expiryDateTime,
      pickupLocation: pickupLocation,
      images: imagePaths
    });


    res.status(201).json({
      success: true,
      listing: listing
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      message: error.message 
    });
  }
};


// --- 2. GET ALL LISTINGS (SMART FEED) ---
// Access: Public
const getListings = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance } = req.query;
    
    const listings = await FoodListing.find({ status: 'available' })
      .populate('donorId', 'name email phone')
      .sort({ createdAt: -1 });
    
    if (latitude && longitude) {
      const listingsWithDistance = listings.map(listing => {
        const distance = calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          listing.pickupLocation.latitude,
          listing.pickupLocation.longitude
        );
        
        return {
          ...listing.toObject(),
          distance: distance
        };
      });
      
      if (maxDistance) {
        const filtered = listingsWithDistance.filter(
          listing => listing.distance <= parseFloat(maxDistance)
        );
        return res.json({
          success: true,
          count: filtered.length,
          listings: filtered
        });
      }
      
      listingsWithDistance.sort((a, b) => a.distance - b.distance);
      return res.json({
        success: true,
        count: listingsWithDistance.length,
        listings: listingsWithDistance
      });
    }
    
    res.json({
      success: true,
      count: listings.length,
      listings: listings
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};


// --- 3. GET SINGLE LISTING ---
// Access: Public
const getListing = async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id)
      .populate('donorId', 'name email');
      
    if (listing) {
      res.json({
        success: true,
        listing: listing
      });
    } else {
      res.status(404).json({ 
        success: false,
        message: 'Listing not found' 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};


// --- 4. UPDATE LISTING ---
// Access: Private
const updateListing = async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found'
      });
    }

    // Check authorization - only donor can update
    if (listing.donorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this listing'
      });
    }

    // Handle new images if uploaded
    if (req.files && req.files.length > 0) {
      const newImagePaths = req.files.map(file => file.path);
      req.body.images = [...(listing.images || []), ...newImagePaths];
    }

    // Update the listing
    const updatedListing = await FoodListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      listing: updatedListing
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// --- 5. DELETE LISTING ---
// Access: Private
const deleteListing = async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id);


    if (!listing) {
      return res.status(404).json({ 
        success: false,
        message: 'Listing not found' 
      });
    }


    if (listing.donorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized to delete this listing' 
      });
    }


    await listing.deleteOne();
    res.json({ 
      success: true,
      message: 'Listing removed successfully' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};


module.exports = {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing
};
