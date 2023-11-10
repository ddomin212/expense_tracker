const axios = require("axios");
const Timestamp = require("../models/Timestamp");
const fs = require("fs");

const fetchCurrency = async () => {
  const headers = {
    headers: {
      apikey: process.env.FIXER_API_KEY,
    },
  };
  const response = await axios.get(
    `https://api.apilayer.com/fixer/latest?symbols=EUR%2CUSD&base=CZK`,
    headers
  );
  var json = JSON.stringify(response.data);
  fs.writeFile("./data/currency.json", json, "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const fixerConnect = async () => {
  const timestamp = await Timestamp.findOne({
    apiKey: process.env.FIXER_API_KEY,
  });
  if (timestamp) {
    const timeDifference = Date.now() - timestamp.updatedAt;
    if (timeDifference > 86400000) {
      timestamp.updatedAt = new Date();
      await timestamp.save();
      await fetchCurrency();
    }
  } else {
    await Timestamp.create({
      apiKey: process.env.FIXER_API_KEY,
      user: process.env.FIXER_USER_ID,
    });
    await fetchCurrency();
  }
};
module.exports = { fixerConnect };
