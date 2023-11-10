const jwt = require("jsonwebtoken");

/**
 * Generates a JSON Web Token for the provided user ID
 * @param {string} userId - User ID to include in the token payload
 * @returns {string} - JSON Web Token
 */
const generateToken = (userId) => {
  // Create payload with user ID and expiration time
  const payload = {
    user: {
      id: userId,
    },
  };
  const expiresIn = process.env.JWT_EXPIRES_IN;

  // Sign token with secret key and payload
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  // Return token
  return token;
};

// Export the generateToken function for use in other modules
module.exports = generateToken;
