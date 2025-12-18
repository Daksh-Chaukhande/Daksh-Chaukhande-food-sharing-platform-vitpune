const express = require('express');
const { getUserEmailsForNotification } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/emails/:listingId', protect, getUserEmailsForNotification);

module.exports = router;
