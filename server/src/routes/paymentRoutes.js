const express = require("express");
const {
  createCheckoutSession,
  getVerificationToken,
} = require("../controllers/apis/stripeController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/fetch").get(authMiddleware, getVerificationToken);
router.route("/:tier").get(createCheckoutSession);

module.exports = router;
