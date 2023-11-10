const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Middleware function to authenticate user with JSON Web Token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {Error} - Throws error if user is not authorized
 */
const authMiddleware = async (req, res, next) => {
  let token;

  // Check if token is included in authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify token and decode user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID and exclude password field
      req.user = await User.findById(decoded.id).select("-password");

      // Call next middleware function
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // If no token is found, throw error
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

/**
 * Middleware function to authorize user based on role
 * @param  {...string} roles - Roles that are authorized to access the route
 * @returns {Function} - Express middleware function
 * @throws {Error} - Throws error if user is not authorized
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Check if user role is included in authorized roles
    if (!roles.includes(req.user.role)) {
      res.status(401);
      throw new Error("Not authorized, invalid permissions");
    }

    // Call next middleware function
    next();
  };
};

// Export the authMiddleware and authorizeRoles functions for use in other modules
module.exports = { authMiddleware, authorizeRoles };
