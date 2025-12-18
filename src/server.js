require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const { checkExpiredListings } = require('./services/expiryService');

const PORT = process.env.PORT || 5000;

connectDB();

// Run expiry check every 10 minutes
setInterval(() => {
  console.log('🔍 Checking for expired listings...');
  checkExpiredListings();
}, 10 * 60 * 1000); // 10 minutes in milliseconds

// Run once on startup
checkExpiredListings();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🌐 Access from other computers: http://YOUR_LOCAL_IP:${PORT}`);
  console.log(`⏰ Auto-expiry check running every 10 minutes`);
});
