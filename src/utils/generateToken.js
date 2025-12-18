/*This code is responsible for creating a "Digital ID Card" for your users after they log in.

In web development, this "ID Card" is called a JSON Web Token (JWT).*/


const jwt = require('jsonwebtoken');   // Import the library for handling tokens

// Function to generate a secure token using the User's ID
const generateToken = (userId) => {
    // jwt.sign(payload, secret, options)
  return jwt.sign({ id: userId }, // Payload: We embed the user's unique ID inside the token so we know who they are later
    process.env.JWT_SECRET, { // Secret: A hidden key from .env that ensures only our server could have created this token
    expiresIn: '30d'  // Expiry: The user will stay logged in for 30 days before needing to login again
  });
};

module.exports = generateToken;
