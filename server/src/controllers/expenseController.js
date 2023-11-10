const Expense = require("../models/Expense");

// @desc    Get all expenses for a user
// @route   GET /api/expenses/user
// @access  Private
const getExpenses = async (req, res) => {
  const expenses = await Expense.paginate(
    { user: req.user._id },
    { limit: 5, page: Number(req.query.page), populate: "user" }
  );
  if (expenses.length === 0) {
    return res.status(400).json({ msg: "No expenses found" });
  }
  res.status(200).json(expenses);
};

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Private
const getAllExpenses = async (req, res) => {
  const expenses = await Expense.paginate(
    {},
    { limit: 5, page: Number(req.query.page), populate: "user" }
  );
  if (expenses.length === 0) {
    return res.status(400).json({ msg: "No expenses found" });
  }
  res.status(200).json(expenses);
};

// @desc    Get expense by id
// @route   GET /api/expenses/:id
// @access  Private
const getExpenseById = async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) {
    return res.status(400).json({ msg: "Expense does not exist" });
  }
  res.status(200).json(expense);
};

// @desc    Create expense
// @route   POST /api/expenses
// @access  Private
const createExpense = async (req, res) => {
  const { title, amount, description } = req.body;
  console.log(req.body);
  if (!title || !amount || !description) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const expense = Expense.create({
    title,
    amount,
    description,
    user: req.user?._id,
  });
  res.status(200).json({ msg: "Expense created" });
};

// @desc    Update expense
// @route   PATCH /api/expenses/:id
// @access  Private
const updateExpense = async (req, res) => {
  const { title, amount, description, user } = req.body;
  const expense = await Expense.findById(req.params.id);
  if (String(req.user._id) !== String(expense.user))
    return res.status(401).json({ msg: "Not authorized" });
  if (!expense) {
    return res.status(400).json({ msg: "Expense does not exist" });
  }
  if (title) expense.title = title;
  if (amount) expense.amount = amount;
  if (description) expense.description = description;
  if (user) expense.user = user;
  await expense.save();
  res.status(200).json(expense);
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (String(req.user._id) !== String(expense.user))
    return res.status(401).json({ msg: "Not authorized" });
  if (!expense) {
    return res.status(400).json({ msg: "Expense does not exist" });
  }
  await expense.remove();
  res.status(200).json({ msg: "Expense removed" });
};

// @desc    Get expenses by date, type and amount
// @route   POST /api/expenses/filter
// @access  Private
const getFilteredExpenses = async (req, res) => {
  const { startDate, endDate, min, max, type } = req.body;
  if (!startDate || !endDate || !min || !max || !type) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  if (startDate > endDate) {
    return res.status(400).json({ msg: "Start date cannot be after end date" });
  }
  const expenses = await Expense.paginate(
    {
      createdAt: {
        $gte: startDate || "1970-01-01",
        $lte: endDate || new Date().toISOString(),
      },
      amount: {
        $gte: min === "" ? 0 : min,
        $lte: max === "" ? 2000000000 : max,
      },
      type: type || { $exists: true },
    },
    { limit: 5, page: Number(req.query.page), populate: "user" }
  );
  if (expenses.docs.length === 0) {
    return res.status(400).json({ msg: "No expenses found" });
  }
  return res.status(200).json(expenses);
};

module.exports = {
  getExpenses,
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getFilteredExpenses,
};
