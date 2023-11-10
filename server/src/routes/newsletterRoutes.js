const express = require("express");
const router = express.Router();
const {
  addNewsletter,
  getNewsletters,
} = require("../controllers/newsletterController");
const {
  authorizeRoles,
  authMiddleware,
} = require("../middleware/authMiddleware");

/**
 * Route to add a new newsletter sub
 */
router.route("/").post(addNewsletter);

/**
 * Route to get all newsletter subs (admin only)
 */
router.route("/").get(authMiddleware, authorizeRoles("Admin"), getNewsletters);

// Export the router for use in other modules
module.exports = router;
