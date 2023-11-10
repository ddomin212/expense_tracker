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

router.use(authMiddleware);
router
  .route("/")
  .get(authorizeRoles("Admin"), getAllExpenses)
  .post(createExpense);
router.route("/user").get(authMiddleware, getExpenses);
router
  .route("/:id")
  .patch(updateExpense)
  .delete(deleteExpense)
  .get(authorizeRoles("Admin"), getExpenseById);
router
  .route("/filter")
  .post(authorizeRoles("Pro", "Admin"), getFilteredExpenses);

module.exports = router;
