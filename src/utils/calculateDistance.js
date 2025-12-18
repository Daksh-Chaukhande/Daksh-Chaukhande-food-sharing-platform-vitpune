// --- HAVERSINE FORMULA ---
// Purpose: Calculates the distance between two GPS coordinates (Latitude/Longitude)
// Returns: Distance in Kilometers (km)

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers (Change to 3959 for Miles)
  
  // Convert degrees to radians (Math functions in JS require radians)
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  // The 'Haversine' math part
  // This calculates the square of half the chord length between the points
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  // Calculate the angular distance in radians
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  const distance = R * c; // Multiply by Earth's radius to get final km
  
  return Math.round(distance * 10) / 10; // Rounds to 1 decimal place (e.g., 5.4 km)
};

// Helper function: Converts Degrees (GPS) to Radians (Math)
const toRad = (degrees) => {
  return degrees * (Math.PI / 180);
};

module.exports = calculateDistance;