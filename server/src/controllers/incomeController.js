const Income = require("../models/Income");

// @desc    Get all incomes for a user
// @route   GET /api/incomes/user
// @access  Private
const getIncomes = async (req, res) => {
  const userIncomes = await Income.paginate(
    { user: req.user._id },
    { limit: 5, page: Number(req.query.page), populate: "user" }
  );

  if (userIncomes.length === 0) {
    return res.status(400).json({ msg: "No incomes found" });
  }
  res.json(userIncomes);
};

// @desc    Get all incomes
// @route   GET /api/incomes
// @access  Private
const getAllIncomes = async (req, res) => {
  const allIncomes = await Income.paginate(
    {},
    { limit: 5, page: Number(req.query.page), populate: "user" }
  );

  if (allIncomes.length === 0) {
    return res.status(400).json({ msg: "No incomes found" });
  }
  res.json(allIncomes);
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
  if (!title || !amount || !description) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    Income.create({
      title,
      amount,
      description,
      user: req.user._id,
    });
    res.status(200).json({ msg: "Income created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// @desc    Update income
// @route   PATCH /api/incomes/:id
// @access  Private
const updateIncome = async (req, res) => {
  const { title, amount, description, user } = req.body;
  const userIncome = await Income.findById(req.params.id);

  if (String(req.user._id) !== String(userIncome.user))
    return res.status(401).json({ msg: "Not authorized" });
  if (!userIncome) {
    return res.status(400).json({ msg: "Income does not exist" });
  }

  if (title) userIncome.title = title;
  if (amount) userIncome.amount = amount;
  if (description) userIncome.description = description;
  if (user) userIncome.user = user;

  await userIncome.save();
  res.status(200).json(userIncome);
};

// @desc    Delete income
// @route   DELETE /api/incomes/:id
// @access  Private
const deleteIncome = async (req, res) => {
  const userIncome = await Income.findById(req.params.id);

  if (String(req.user._id) !== String(userIncome.user))
    return res.status(401).json({ msg: "Not authorized" });
  if (!userIncome) {
    return res.status(400).json({ msg: "Income does not exist" });
  }

  await userIncome.remove();
  res.status(200).json({ msg: "Income removed" });
};

// @desc    Get income by date, type or amount
// @route   GET /api/incomes/filter
// @access  Private
const getFilteredIncome = async (req, res) => {
  const { startDate, endDate, min, max, type } = req.body;
  if (startDate > endDate) {
    return res.status(400).json({ msg: "Start date cannot be after end date" });
  }

  const filteredIncomes = await Income.paginate(
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

  if (filteredIncomes.docs.length === 0) {
    return res.status(400).json({ msg: "No income found" });
  }
  return res.status(200).json(filteredIncomes);
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
