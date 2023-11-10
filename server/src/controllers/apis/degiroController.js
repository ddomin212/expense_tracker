const connectDegiro = require("../../config/degiroConnect");
const Income = require("../../models/Income");
const User = require("../../models/User");
const rot13Cipher = require("rot13-cipher");

//@desc    Connect Degiro
//@route   POST /api/connect/degiro
//@access  Private
const connectDegiroAPI = async (req, res, next) => {
  const { degiroId, degiroPass } = req.body;
  const id = req.user?._id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.apiKeys = {
    ...user.apiKeys,
    degiro: { degiroId, degiroPass: rot13Cipher(degiroPass) }, //do produkce by to pak asi bylo lepsi zasifrovat víc
  };
  user.save();
  next();
};

const parseDegiroData = (data) => {
  const amount =
    trade.positionType === "CASH"
      ? trade.value
      : trade.value + trade.plBase.EUR;
  const currency = trade.productData?.currency || Object.keys(trade.plBase)[0];
  return {
    title: trade?.productData?.symbol || trade.positionType,
    description: trade.productData?.name || "Degiro cash",
    amount:
      currency === "CZK"
        ? amount
        : currency === "EUR"
        ? amount * 23.7
        : amount * 22.1,
    type: "degiro",
    tid: trade.id,
    user: id,
    currency,
  };
};

const uploadDegiro = async (req, res) => {
  const id = req.user?._id;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(user.apiKeys);
  const { degiroId, degiroPass } = user.apiKeys.degiro;
  const data = await connectDegiro(degiroId, rot13Cipher(degiroPass));

  const filtered = data.filter((trade) => trade.value).map(parseDegiroData);

  console.log(filtered);
  if (!filtered) {
    return res.status(404).json({ message: "No trades found" });
  }

  const income = await Income.insertMany(filtered);
  if (!income) {
    return res.status(400).json({ message: "Insert error" });
  }
  return res.status(200).json({ message: "Success" });
};

const disconnectDegiro = async (req, res, next) => {
  const id = req.user?._id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.apiKeys = { ...user.apiKeys, degiro: "" };
  user.save();
  const income = await Income.deleteMany({ type: "degiro", user: id });
  if (!income) {
    return res.status(404).json({ message: "No data found" });
  }

  res.status(200).json({ message: "Success" });
  next();
};

const updateDegiro = async (req, res, next) => {
  const id = req.user?._id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(user.apiKeys);
  const { degiroId, degiroPass } = user.apiKeys.degiro;
  req.body.degiroId = degiroId;
  req.body.degiroPass = rot13Cipher(degiroPass);
  next();
};

module.exports = {
  connectDegiroAPI,
  uploadDegiro,
  disconnectDegiro,
  updateDegiro,
};
