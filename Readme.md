# 🍱 FoodShare - Community Food Donation Platform

**FoodShare** is a full-stack application designed to reduce food waste and combat hunger by connecting local food donors (restaurants, individuals) with people in need.

## 🚀 Key Features

* **📍 Location-Based Feed:** Find food donations near you using Geolocation (Haversine formula).
* **🔐 Secure Authentication:** User registration and login with JWT and BCrypt.
* **📸 Image Uploads:** Donors can upload photos of food items (powered by Multer).
* **⏰ Auto-Expiry System:** Background service automatically marks food as "expired" to maintain safety.
* **🛡️ Validation:** Robust input validation using Express-Validator.

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JSON Web Tokens (JWT)
* **File Storage:** Local Storage / Multer (Ready for Cloudinary)

## 📂 Project Structure

```text
src/
├── config/         # Database connection
├── controllers/    # Game logic (Auth, Listings)
├── middleware/     # Security checks (Auth, Validation)
├── models/         # Database Schemas (User, FoodListing)
├── routes/         # API URLs
├── services/       # Background tasks (Auto-expiry)
├── utils/          # Helpers (Distance calc, Email)
├── app.js          # Express app setup
└── server.js       # Entry point