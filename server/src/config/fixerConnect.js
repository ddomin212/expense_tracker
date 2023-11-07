const axios = require("axios");
const Timestamp = require("../models/Timestamp");
const fs = require("fs");

const fixerConnect = async () => {
  const timestamp = await Timestamp.findOne({
    apiKey: process.env.FIXER_API_KEY,
  });
  const headers = {
    headers: {
      apikey: process.env.FIXER_API_KEY,
    },
  };
  if (timestamp) {
    const diff = Date.now() - timestamp.updatedAt;
    //console.log(diff);
    if (diff > 86400000) {
      timestamp.updatedAt = new Date();
      await timestamp.save();
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
    }
  } else {
    await Timestamp.create({
      apiKey: process.env.FIXER_API_KEY,
      user: "63e2861085c3bfad17df9416",
    });
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
  }
};
module.exports = { fixerConnect };
