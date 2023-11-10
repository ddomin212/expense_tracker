const express = require("express");
const router = express.Router();
const { addContact, getContacts } = require("../controllers/contactController");
const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/authMiddleware");

/**
 * Route to add a new contact
 */
router.route("/").post(addContact);

/**
 * Route to get all contacts (admin only)
 */
router.route("/").get([authMiddleware, authorizeRoles("Admin")], getContacts);

// Export the router for use in other modules
module.exports = router;
