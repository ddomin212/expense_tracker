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

router
  .route("/")
  .get(authMiddleware, authorizeRoles("Admin"), getUsers)
  .post(registerUser);
router
  .route("/stats")
  .get(authMiddleware, authorizeRoles("Pro", "Admin"), accountStats);
router.route("/stats/basic").get(authMiddleware, accountNet);
router
  .route("/currency")
  .get(authMiddleware, getUserCurrency)
  .post(authMiddleware, updateUserCurrency);
router
  .route("/stats/:type")
  .get(authMiddleware, authorizeRoles("Pro", "Admin"), monthlyStats);

module.exports = router;
router
  .route("/:id")
  .patch(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);
