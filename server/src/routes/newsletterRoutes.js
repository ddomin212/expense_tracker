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
router
  .route("/")
  .post(addNewsletter)
  .get(authMiddleware, authorizeRoles("Admin"), getNewsletters);
module.exports = router;
