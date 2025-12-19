const express = require('express');
const cors = require('cors');
const path = require('path');

const { helmet, generalLimiter } = require('./middleware/security');
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');
const notificationRoutes = require('./routes/notificationRoutes'); // ← Add this

const app = express();

app.use(helmet());
app.use(generalLimiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/notifications', notificationRoutes); // ← Add this

app.get('/api/ping', (req, res) => {
  res.json({ message: '✅ Backend is running!' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
