const Expense = require("../models/Expense");
const Income = require("../models/Income");

/**
 * Inserts multiple expense documents into the database.
 * @param {Array} expenses - An array of expense documents to insert.
 */
async function insertManyExpenses(expenses) {
  try {
    // Use the insertMany method of the Expense model to insert the documents.
    // Set the "ordered" option to false to continue inserting documents even if some fail.
    await Expense.insertMany(expenses, { ordered: false });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Inserts multiple income documents into the database.
 * @param {Array} incomes - An array of income documents to insert.
 */
async function insertManyIncomes(incomes) {
  try {
    // Use the insertMany method of the Income model to insert the documents.
    // Set the "ordered" option to false to continue inserting documents even if some fail.
    await Income.insertMany(incomes, { ordered: false });
  } catch (error) {
    console.log(error);
  }
}

// Export the functions for use in other modules.
module.exports = { insertManyExpenses, insertManyIncomes };
