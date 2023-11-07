const Expense = require("../../models/Expense");
const Income = require("../../models/Income");
const User = require("../../models/User");
const axios = require("axios");
const parseDate = require("../../utils/parseDate");
const Timestamp = require("../../models/Timestamp");
//const openai = require("../../config/gptConnect");
const {
  insertManyExpenses,
  insertManyIncomes,
} = require("../../utils/insertMany");
const loopData = require("../../utils/parseFio");
//@ connect to fio api
//@ POST /api/fio
//@ access private

const connectFio = async (req, res) => {
  const { apiKey, from } = req.body;
  const id = req.user?._id;
  const maxdate = new Date().toISOString().split("T")[0];
  const timestamp = await Timestamp.findOne({ apiKey, user: id });
  const user = await User.findById(id);
  if (!timestamp) {
    await Timestamp.create({
      apiKey,
      user: id,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.apiKeys["fio"] = [...user.apiKeys["fio"], apiKey];
    user.markModified("apiKeys");
    user.save();
  }
  console.log(user.apiKeys["fio"]);
  const mindate = timestamp?.updatedAt.toISOString().split("T")[0];
  if (mindate === maxdate) {
    return res
      .status(200)
      .json({ message: "Fetching of data is permitted once a day" });
  }
  const fetchData = await Promise.all(
    loopData(timestamp, from, user.apiKeys["fio"], mindate, maxdate, id)
  );
  console.log(fetchData);
  if (fetchData.indexOf(undefined) !== -1) {
    return res.status(404).json({ message: "Could not fetch data" });
  }
  /*const fetch = await axios.get(
    `https://www.fio.cz/ib_api/rest/periods/${apiKey}/${
      timestamp ? mindate : from || "2019-01-01"
    }/${maxdate}/transactions.json`
  );*/
  if (timestamp) {
    timestamp.updatedAt = new Date();
    timestamp.save();
  }
  const totalData = fetchData.reduce((acc, curr) => {
    return acc.concat(curr?.accountStatement.transactionList.transaction);
  }, []);
  console.log(totalData);
  const data = totalData;
  let newExpenses = [];
  let expenses = data.filter((doc) => doc.column1.value < 0);
  for (let doc of expenses) {
    /*const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${
        doc?.column25?.value || doc?.column16?.value || doc?.column7?.value
      } assign to one of these categories: food, transport, bills, entertainment, shopping, health, other`,
      temperature: 1,
    });*/
    //console.log(completion);
    let docData = {
      title: doc?.column8?.value || "bank payment",
      amount: 0 - doc.column1.value,
      description:
        doc?.column25?.value ||
        doc?.column16?.value ||
        doc?.column7?.value ||
        "cant fetch",
      createdAt: parseDate(doc?.column0?.value) || Date.now(),
      tid: doc.column22.value,
      currency: doc.column14.value,
      type: "fio",
      user: id,
    };
    newExpenses.push(docData);
    //console.log(doc);
  }
  const incomes = data
    .filter((doc) => doc.column1.value > 0)
    .map((doc) => {
      const income = {
        title: doc?.column8?.value || "bank payment",
        amount: doc.column1.value,
        description:
          doc?.column25?.value ||
          doc?.column16?.value ||
          doc?.column7?.value ||
          "cant fetch",
        tid: doc.column22.value,
        createdAt: parseDate(doc?.column0?.value) || Date.now(),
        type: "fio",
        user: id,
      };

      return income;
    });
  await insertManyExpenses(newExpenses);
  await insertManyIncomes(incomes);

  return res.status(200).json({ message: "Success" });
};
//@ disconnect fio api
//@ POST /api/fio
//@ access private
const disconnectFio = async (req, res) => {
  const id = req.user?._id;
  const timestamp = await Timestamp.deleteMany({ user: id });
  if (!timestamp) {
    return res.status(404).json({ message: "Connection not found" });
  }
  const expenses = await Expense.deleteMany({ type: "fio", user: id });
  const incomes = await Income.deleteMany({ type: "fio", user: id });
  if (!expenses || !incomes) {
    return res.status(404).json({ message: "No data found" });
  }
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
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const apiKey = user.apiKeys["fio"];
  if (!apiKey) {
    return res.status(404).json({ message: "Api key not found" });
  }
  req.body.apiKey = apiKey;
  next();
};

module.exports = { connectFio, disconnectFio, updateFio };
