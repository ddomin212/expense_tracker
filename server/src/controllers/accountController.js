const Expense = require("../models/Expense");
const Income = require("../models/Income");
//@desc Get expense and income statistics for a user
//@route GET /api/statistics
//@access Private
const accountStats = async (req, res) => {
  const expenses = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
        amount: { $gt: 0 },
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" } || 0,
        count: { $sum: 1 } || 0,
        min: { $min: "$amount" } || 0,
        max: { $max: "$amount" } || 0,
        avg: { $avg: "$amount" } || 0,
      },
    },
  ]);
  const incomes = await Income.aggregate([
    {
      $match: {
        user: req.user._id,
        amount: { $gt: 0 },
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" } || 0,
        count: { $sum: 1 } || 0,
        min: { $min: "$amount" } || 0,
        max: { $max: "$amount" } || 0,
        avg: { $avg: "$amount" } || 0,
      },
    },
  ]);
  const zeroObject = {
    _id: null,
    total: 0,
    count: 0,
    min: 0,
    max: 0,
    avg: 0,
  };
  res.json({
    expenses: expenses.length !== 0 ? expenses : [zeroObject],
    incomes: incomes.length !== 0 ? incomes : [zeroObject],
  });
};
const accountNet = async (req, res) => {
  const expenses = await Expense.aggregate([
    {
      $match: {
        user: req.user._id,
        amount: { $gt: 0 },
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" } || 0,
      },
    },
  ]);
  const incomes = await Income.aggregate([
    {
      $match: {
        user: req.user._id,
        amount: { $gt: 0 },
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" } || 0,
      },
    },
  ]);
  const zeroObject = {
    _id: null,
    total: 0,
  };
  res.json({
    expenses: expenses.length !== 0 ? expenses : [zeroObject],
    incomes: incomes.length !== 0 ? incomes : [zeroObject],
  });
};
const monthlyStats = async (req, res) => {
  const { type } = req.params;
  let monthly;
  if (type === "expense") {
    monthly = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
          amount: { $gt: 0 },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);
  } else if (type === "income") {
    monthly = await Income.aggregate([
      {
        $match: {
          user: req.user._id,
          amount: { $gt: 0 },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);
  } else {
    monthly = undefined;
    return res.status(400).json({ msg: "Invalid type" });
  }
  res.json({ monthly });
};
module.exports = { accountStats, monthlyStats, accountNet };
