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
router.use(authMiddleware);
router
  .route("/")
  .get(authorizeRoles("Admin"), getAllIncomes)
  .post(createIncome);
router.route("/user").get(getIncomes);
router
  .route("/:id")
  .patch(updateIncome)
  .delete(deleteIncome)
  .get(authorizeRoles("Admin"), getIncomeById);
router.route("/filter").post(authorizeRoles("Pro", "Admin"), getFilteredIncome);
module.exports = router;
