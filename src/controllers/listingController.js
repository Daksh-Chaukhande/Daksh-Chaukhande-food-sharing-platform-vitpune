const FoodListing = require('../models/FoodListing');
const calculateDistance = require('../utils/calculateDistance');

// --- 1. CREATE LISTING ---
// Access: Private
const createListing = async (req, res) => {
  try {
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

    res.status(201).json(listing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// --- 2. GET ALL LISTINGS (SMART FEED) ---
// Access: Public
const getListings = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance } = req.query;
    
    // Fetch all available food from DB
    const listings = await FoodListing.find({ status: 'available' })
      .populate('donorId', 'name email phone')
      .sort({ createdAt: -1 });
    
    // If User Location is provided, calculate distances
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
      
      // Filter by Max Distance
      if (maxDistance) {
        const filtered = listingsWithDistance.filter(
          listing => listing.distance <= parseFloat(maxDistance)
        );
        return res.json(filtered);
      }
      
      // Sort by Distance
      listingsWithDistance.sort((a, b) => a.distance - b.distance);
      return res.json(listingsWithDistance);
    }
    
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 3. GET SINGLE LISTING ---
// Access: Public
const getListing = async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id)
      .populate('donorId', 'name email');
      
    if (listing) {
      res.json(listing);
    } else {
      res.status(404).json({ message: 'Listing not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- 4. DELETE LISTING ---
// Access: Private
const deleteListing = async (req, res) => {
  try {
    const listing = await FoodListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.donorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this listing' });
    }

    await listing.deleteOne();
    res.json({ message: 'Listing removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export ALL functions
module.exports = {
  createListing,
  getListings,
  getListing,
  deleteListing
};