const connectXTB = require("../../config/xtbConnect");
const Income = require("../../models/Income");
const User = require("../../models/User");
const data = require("../../../data/xtb.json");
const dataUser = require("../../../data/xtbUser.json");
const dataMargin = require("../../../data/xtbMargin.json");
const rot13Cipher = require("rot13-cipher");

//@desc connect xtb api
//@route POST /api/connect/xtb
//@access private
const connectXtb = async (req, res, next) => {
  const { xtbId, xtbPass } = req.body;
  const id = req.user?._id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.apiKeys = {
    ...user.apiKeys,
    xtb: { xtbId, xtbPass: rot13Cipher(xtbPass) }, //do produkce by to pak asi bylo lepsi zasifrovat víc
  };
  user.save();
  await connectXTB(xtbId, xtbPass);
  next();
};

//@desc upload XTB data to mongo
//@route POST /api/connect/xtb
//@access private
const uploadXtb = async (req, res) => {
  const id = req.user?._id;
  console.log(data);

  const trades = data.returnData
    .map((trade) => {
      return {
        title: trade.symbol,
        amount:
          dataUser.returnData.currency === "CZK"
            ? trade.profit
            : dataUser.returnData.currency === "EUR"
            ? trade.profit * 23.7
            : trade.profit * 22.1,
        description: "XTB stock",
        created: trade.openTime,
        currency: dataUser.returnData.currency,
        type: "xtb",
        user: id,
        tid: trade.order,
      };
    })
    .push({
      title: "CASH",
      amount: dataMargin.returnData.margin_free,
      description: "XTB cash",
      created: new Date(dataMargin.time.UTCTimestamp),
      currency: dataUser.returnData.currency,
      type: "xtb",
      user: id,
      tid: "FOREX_XTB",
    });
  if (!trades) {
    return res.status(404).json({ message: "No trades found" });
  }

  const income = await Income.insertMany(trades);
  if (!income) {
    return res.status(400).json({ message: "Insert error" });
  }
  res.status(200).json({ message: "Success" });
};

//@ disconnect xtb api
//@ GET /api/connect/xtb/rm
//@ access private
const disconnectXtb = async (req, res, next) => {
  const id = req.user?._id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.apiKeys = { ...user.apiKeys, xtb: "" };
  user.save();
  const income = await Income.deleteMany({ type: "xtb", user: id });
  if (!income) {
    return res.status(404).json({ message: "No data found" });
  }

  res.status(200).json({ message: "Success" });
  next();
};
//@ fetch xtb data
//@ GET /api/connect/xtb/up
//@ access private
const updateXtb = async (req, res, next) => {
  const id = req.user?._id;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(user.apiKeys);
  const { xtbId, xtbPass } = user.apiKeys.xtb;
  req.body.xtbId = xtbId;
  req.body.xtbPass = rot13Cipher(xtbPass);
  next();
  //disconnectXtb(req, res);connectXtb(req, res);
};
module.exports = { connectXtb, disconnectXtb, updateXtb, uploadXtb };
