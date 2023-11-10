const express = require("express");
const router = express.Router();
const { addContact, getContacts } = require("../controllers/contactController");
const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/authMiddleware");

router
  .route("/")
  .post(addContact)
  .get([authMiddleware, authorizeRoles("Admin")], getContacts);
module.exports = router;
