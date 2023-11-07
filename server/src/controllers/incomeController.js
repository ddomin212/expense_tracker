const Income = require("../models/Income");

// @desc    Get all incomes for a user
// @route   GET /api/incomes/user
// @access  Private
const getIncomes = async (req, res) => {
  const incomes = await Income.paginate(
    { user: req.user._id },
    { limit: 5, page: Number(req.query.page), populate: "user" }
  );
  if (incomes.length === 0) {
    return res.status(400).json({ msg: "No incomes found" });
  }
  res.json(incomes);
};
// @desc    Get all incomes
// @route   GET /api/incomes
// @access  Private
const getAllIncomes = async (req, res) => {
  const incomes = await Income.paginate(
    {},
    { limit: 5, page: Number(req.query.page), populate: "user" }
  );
  if (incomes.length === 0) {
    return res.status(400).json({ msg: "No incomes found" });
  }
  res.json(incomes);
};
// @desc    Get income by id
// @route   GET /api/incomes/:id
// @access  Private
const getIncomeById = async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (!income) {
    return res.status(400).json({ msg: "Income does not exist" });
  }
  res.json(income);
};
// @desc    Create income
// @route   POST /api/incomes
// @access  Private
const createIncome = async (req, res) => {
  const { title, amount, description } = req.body;
  console.log(req.body);
  if (!title || !amount || !description) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const income = Income.create({
    title,
    amount,
    description,
    user: req.user._id,
  });
  res.status(200).json({ msg: "Income created" });
};
// @desc    Update income
// @route   PATCH /api/incomes/:id
// @access  Private
const updateIncome = async (req, res) => {
  const { title, amount, description, user } = req.body;
  const income = await Income.findById(req.params.id);
  if (String(req.user._id) !== String(income.user))
    return res.status(401).json({ msg: "Not authorized" });
  if (!income) {
    return res.status(400).json({ msg: "Income does not exist" });
  }
  if (title) income.title = title;
  if (amount) income.amount = amount;
  if (description) income.description = description;
  if (user) income.user = user;
  await income.save();
  res.status(200).json(income);
};
// @desc    Delete income
// @route   DELETE /api/incomes/:id
// @access  Private
const deleteIncome = async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (String(req.user._id) !== String(income.user))
    return res.status(401).json({ msg: "Not authorized" });
  if (!income) {
    return res.status(400).json({ msg: "Income does not exist" });
  }
  await income.remove();
  res.status(200).json({ msg: "Income removed" });
};
// @desc    Get income by date, type or amount
// @route   GET /api/incomes/filter
// @access  Private
const getFilteredIncome = async (req, res) => {
  console.log(req.body);
  const { startDate, endDate, min, max, type } = req.body;
  if (startDate > endDate) {
    return res.status(400).json({ msg: "Start date cannot be after end date" });
  }
  const income = await Income.paginate(
    {
      createdAt: {
        $gte: startDate || "1970-01-01",
        $lte: endDate || new Date().toISOString(),
      },
      amount: { $gte: min || 0, $lte: max || Infinity } || { $exists: true },
      type: type || { $exists: true },
    },
    { limit: 5, page: Number(req.query.page), populate: "user" }
  );
  if (income.docs.length === 0) {
    return res.status(400).json({ msg: "No income found" });
  }
  return res.status(200).json(income);
};
module.exports = {
  getIncomes,
  getAllIncomes,
  getIncomeById,
  createIncome,
  updateIncome,
  deleteIncome,
  getFilteredIncome,
};
