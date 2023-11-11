const Expense = require("../models/Expense");

// @desc    Get all expenses for a user
// @route   GET /api/expenses/user
// @access  Private
const getExpenses = async (req, res) => {
  const paginatedExpensesOfUser = await Expense.paginate(
    { user: req.user._id },
    { limit: 5, page: Number(req.query.page), populate: "user" }
  );
  if (paginatedExpensesOfUser.length === 0) {
    return res.status(400).json({ msg: "No expenses for current user found" });
  }
  res.status(200).json(paginatedExpensesOfUser);
};

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Private
const getAllExpenses = async (req, res) => {
  const allPaginatedExpenses = await Expense.paginate(
    {},
    { limit: 5, page: Number(req.query.page), populate: "user" }
  );

  if (allPaginatedExpenses.length === 0) {
    return res.status(400).json({ msg: "No expenses found" });
  }
  res.status(200).json(allPaginatedExpenses);
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

  try {
    const expense = await Expense.create({
      title,
      amount,
      description,
      user: req.user._id,
    });
    res.status(200).json({ msg: "Expense created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// @desc    Update expense
// @route   PATCH /api/expenses/:id
// @access  Private
const updateExpense = async (req, res) => {
  const { title, amount, description, user } = req.body;
  const userExpense = await Expense.findById(req.params.id);

  if (String(req.user._id) !== String(userExpense.user))
    return res.status(401).json({ msg: "Not authorized" });
  if (!userExpense) {
    return res.status(400).json({ msg: "Expense does not exist" });
  }

  if (title) userExpense.title = title;
  if (amount) userExpense.amount = amount;
  if (description) userExpense.description = description;
  if (user) userExpense.user = user;

  await userExpense.save();
  res.status(200).json(userExpense);
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res) => {
  const userExpense = await Expense.findById(req.params.id);

  if (String(req.user._id) !== String(userExpense.user))
    return res.status(401).json({ msg: "Not authorized" });
  if (!userExpense) {
    return res.status(400).json({ msg: "Expense does not exist" });
  }

  await userExpense.remove();
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

  const filteredExpenses = await Expense.paginate(
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
  return res.status(200).json(filteredExpenses);
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
