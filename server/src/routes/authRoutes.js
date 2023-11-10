const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  verifyPassword,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const { authMiddleware } = require("../middleware/authMiddleware");

/**
 * Route to handle user login
 */
router.route("/").post(login);

/**
 * Route to handle user logout
 */
router.route("/logout").get(logout);

/**
 * Route to verify user password
 */
router.route("/verify").post(authMiddleware, verifyPassword);

/**
 * Route to verify user email
 */
router.route("/verify-email").post(verifyEmail);

/**
 * Route to reset user password
 */
router.route("/reset-password").post(resetPassword);

/**
 * Route to handle forgot password request
 */
router.route("/forgot-password").post(forgotPassword);

// Export the router for use in other modules
module.exports = router;
