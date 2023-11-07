const Expense = require("../models/Expense");
const Income = require("../models/Income");

async function insertManyExpenses(expenses) {
  try {
    await Expense.insertMany(expenses, { ordered: false });
  } catch (error) {
    console.log(error);
  }
}
async function insertManyIncomes(incomes) {
  try {
    await Income.insertMany(incomes, { ordered: false });
  } catch (error) {
    console.log(error);
  }
}
module.exports = { insertManyExpenses, insertManyIncomes };
