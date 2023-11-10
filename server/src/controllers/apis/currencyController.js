const User = require("../../models/User"); // Importing the User model
const currencyData = require("../../../data/currency.json"); // Importing currency data from a JSON file

//@desc Update user currency
//@route PATCH /api/users/currency
//@access Private
const updateUserCurrency = async (req, res) => {
  const { currency } = req.body; // Extracting the currency value from the request body
  const user = await User.findById(req.user._id); // Finding the user by ID
  if (!user) return res.status(404).json({ message: "User not found" }); // If user is not found, return a 404 error
  user.currency = currency; // Updating the user's currency value
  await user.save(); // Saving the updated user object
  res.status(200).json({ currency: user.currency }); // Returning the updated currency value
};

//@desc Get user currency
//@route GET /api/users/currency
//@access Private
const getUserCurrency = async (req, res) => {
  const user = await User.findById(req.user._id); // Finding the user by ID
  if (!user) return res.status(404).json({ message: "User not found" }); // If user is not found, return a 404 error
  res.status(200).json({ currency: user.currency, currencyData }); // Returning the user's currency value and the currency data
};

module.exports = {
  getUserCurrency,
  updateUserCurrency,
};
