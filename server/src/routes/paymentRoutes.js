const express = require("express");
const {
  createCheckoutSession,
  getVerificationToken,
} = require("../controllers/apis/stripeController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * Route to fetch the verification token for a user
 */
router.route("/fetch").get(authMiddleware, getVerificationToken);

/**
 * Route to create a checkout session for a given tier
 */
router.route("/:tier").get(createCheckoutSession);

module.exports = router;
