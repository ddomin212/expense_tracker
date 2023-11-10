const express = require("express");
const router = express.Router();
const {
  getIncomes,
  createIncome,
  updateIncome,
  deleteIncome,
  getIncomeById,
  getAllIncomes,
  getFilteredIncome,
} = require("../controllers/incomeController");
const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Use authMiddleware for all routes in this router
router.use(authMiddleware);

/**
 * Route to get all incomes (admin only)
 */
router.route("/").get(authorizeRoles("Admin"), getAllIncomes);

/**
 * Route to create a new income
 */
router.route("/").post(createIncome);

/**
 * Route to get incomes for the authenticated user
 */
router.route("/user").get(getIncomes);

/**
 * Route to update an income by ID
 */
router.route("/:id").patch(updateIncome);

/**
 * Route to delete an income by ID
 */
router.route("/:id").delete(deleteIncome);

/**
 * Route to get an income by ID (admin only)
 */
router.route("/:id").get(authorizeRoles("Admin"), getIncomeById);

/**
 * Route to get filtered incomes (pro and admin only)
 */
router.route("/filter").post(authorizeRoles("Pro", "Admin"), getFilteredIncome);

// Export the router for use in other modules
module.exports = router;
