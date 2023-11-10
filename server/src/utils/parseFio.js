const axios = require("axios");
const parseDate = require("./parseDate");
const Timestamp = require("../models/Timestamp");

const loopData = (timestamp, from, apiKeys, mindate, maxdate, id) => {
  const data = apiKeys.map((apiKey) => {
    const fetch = axios
      .get(
        `https://www.fio.cz/ib_api/rest/periods/${apiKey}/${
          timestamp ? mindate : from || "2019-01-01"
        }/${maxdate}/transactions.json`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return fetch;
  });
  return data;
};

const parseDataIntoExpensesAndIncomes = (data, id) => {
  let expenses = data
    .filter((doc) => doc.column1.value < 0)
    .map((doc) => {
      return {
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
    });
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
  return { expenses, incomes };
};

module.exports = { loopData, parseDataIntoExpensesAndIncomes };
