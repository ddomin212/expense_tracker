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
router.route("/").post(login);
router.route("/logout").get(logout);
router.route("/verify").post(authMiddleware, verifyPassword);
router.route("/verify-email").post(verifyEmail);
router.route("/reset-password").post(resetPassword);
router.route("/forgot-password").post(forgotPassword);
module.exports = router;
