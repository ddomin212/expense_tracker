const express = require("express");
const router = express.Router();
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseById,
  getAllExpenses,
  getFilteredExpenses,
} = require("../controllers/expenseController");
const {
  authMiddleware,
  authorizeRoles,
} = require("../middleware/authMiddleware");

// Use authMiddleware for all routes in this router
router.use(authMiddleware);

/**
 * Route to get all expenses (admin only)
 */
router.route("/").get(authorizeRoles("Admin"), getAllExpenses);

/**
 * Route to create a new expense
 */
router.route("/").post(createExpense);

/**
 * Route to get expenses for the authenticated user
 */
router.route("/user").get(getExpenses);

/**
 * Route to update an expense by ID
 */
router.route("/:id").patch(updateExpense);

/**
 * Route to delete an expense by ID
 */
router.route("/:id").delete(deleteExpense);

/**
 * Route to get an expense by ID (admin only)
 */
router.route("/:id").get(authorizeRoles("Admin"), getExpenseById);

/**
 * Route to get filtered expenses (pro and admin only)
 */
router
  .route("/filter")
  .post(authorizeRoles("Pro", "Admin"), getFilteredExpenses);

// Export the router for use in other modules
module.exports = router;
