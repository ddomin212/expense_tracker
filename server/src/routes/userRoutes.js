const express = require("express");
const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  accountStats,
  monthlyStats,
  accountNet,
} = require("../controllers/accountController");
const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const {
  getUserCurrency,
  updateUserCurrency,
} = require("../controllers/apis/currencyController");
const router = express.Router();

// Route for getting all users and creating a new user
router
  .route("/")
  .get(authMiddleware, authorizeRoles("Admin"), getUsers) // Only Admins can get all users
  .post(registerUser); // Anyone can create a new user

// Route for getting account statistics
router
  .route("/stats")
  .get(authMiddleware, authorizeRoles("Pro", "Admin"), accountStats); // Only Pros and Admins can get account stats

// Route for getting basic account statistics
router.route("/stats/basic").get(authMiddleware, accountNet); // Anyone can get basic account stats

// Route for getting and updating user currency
router
  .route("/currency")
  .get(authMiddleware, getUserCurrency) // Anyone can get their own currency
  .post(authMiddleware, updateUserCurrency); // Anyone can update their own currency

// Route for getting monthly account statistics
router
  .route("/stats/:type")
  .get(authMiddleware, authorizeRoles("Pro", "Admin"), monthlyStats); // Only Pros and Admins can get monthly account stats

// Route for updating and deleting a user
router
  .route("/:id")
  .patch(authMiddleware, updateUser) // Only the user or an Admin can update a user
  .delete(authMiddleware, deleteUser); // Only the user or an Admin can delete a user

module.exports = router;
