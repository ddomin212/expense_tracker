const User = require("../../models/User");
const currencyData = require("../../../data/currency.json");
//@desc Update user currency
//@route PATCH /api/users/currency
//@access Private
const updateUserCurrency = async (req, res) => {
  const { currency } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.currency = currency;
  await user.save();
  res.status(200).json({ currency: user.currency });
};
//@desc Get user currency
//@route GET /api/users/currency
//@access Private
const getUserCurrency = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ currency: user.currency, currencyData });
};

module.exports = {
  getUserCurrency,
  updateUserCurrency,
};
