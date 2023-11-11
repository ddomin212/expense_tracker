const Expense = require("../../models/Expense");
const Income = require("../../models/Income");
const User = require("../../models/User");
const Timestamp = require("../../models/Timestamp");

const {
  parseDataIntoExpensesAndIncomes,
  loopData,
} = require("../../utils/parseFio");
const {
  insertManyExpenses,
  insertManyIncomes,
} = require("../../utils/insertMany");

//@desc connect to fio api
//@route POST /api/fio
//@access private
const connectFio = async (req, res) => {
  const { apiKey, from } = req.body;
  const id = req.user?._id;
  const maxdate = new Date().toISOString().split("T")[0];
  const timestamp = await Timestamp.findOne({ apiKey, user: id });

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // create timestamp in mong for further fetching
  if (!timestamp) {
    await Timestamp.create({
      apiKey,
      user: id,
    });

    user.apiKeys["fio"] = [...user.apiKeys["fio"], apiKey];
    user.markModified("apiKeys");
    user.save();
  }

  // check if fetching is permitted by timestamp
  const mindate = timestamp?.updatedAt.toISOString().split("T")[0];
  if (mindate === maxdate) {
    return res
      .status(200)
      .json({ message: "Fetching of data is permitted once a day" });
  }

  // fetch data from fio api
  const fetchData = await Promise.all(
    loopData(timestamp, from, user.apiKeys["fio"], mindate, maxdate, id)
  );

  // check if data is fetched
  if (fetchData.indexOf(undefined) !== -1) {
    return res.status(404).json({ message: "Could not fetch data" });
  }

  // update timestamp
  if (timestamp) {
    timestamp.updatedAt = new Date();
    timestamp.save();
  }

  // parse data into expenses and incomes
  const totalData = fetchData.reduce((acc, curr) => {
    return acc.concat(curr?.accountStatement.transactionList.transaction);
  }, []);

  const data = totalData;

  const { expenses, incomes } = parseDataIntoExpensesAndIncomes(data, id);

  // insert data into mongo
  await insertManyExpenses(expenses);
  await insertManyIncomes(incomes);

  return res.status(200).json({ message: "Success" });
};

//@desc disconnect fio api
//@route POST /api/fio
//@access private
const disconnectFio = async (req, res) => {
  const id = req.user?._id;

  // delete all data from mongo
  const timestamp = await Timestamp.deleteMany({ user: id });
  if (!timestamp) {
    return res.status(404).json({ message: "Connection not found" });
  }
  const expenses = await Expense.deleteMany({ type: "fio", user: id });
  const incomes = await Income.deleteMany({ type: "fio", user: id });
  if (!expenses || !incomes) {
    return res.status(404).json({ message: "No data found" });
  }

  // delete api key from user object
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    user.apiKeys = { ...user.apiKeys, fio: "" };
    user.save();
  }

  res.status(200).json({ message: "Success" });
};

//@desc fetch apiKey from User object
//@route GET /api/connect/fio/up
//@access private
const updateFio = async (req, res, next) => {
  const id = req.user?._id;

  // fetch api key from user object
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const apiKey = user.apiKeys["fio"];
  if (!apiKey) {
    return res.status(404).json({ message: "Api key not found" });
  }
  req.body.apiKey = apiKey;

  // fetch data from fio api (connectFio)
  next();
};

module.exports = { connectFio, disconnectFio, updateFio };
