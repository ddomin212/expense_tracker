const axios = require("axios");
const Timestamp = require("../models/Timestamp");
const fs = require("fs");

/**
 * Fetches currency exchange rates from the Fixer API and saves them to a JSON file
 */
const fetchCurrency = async () => {
  // Set headers with API key
  const headers = {
    headers: {
      apikey: process.env.FIXER_API_KEY,
    },
  };

  // Make GET request to Fixer API for latest exchange rates
  const response = await axios.get(
    `https://api.apilayer.com/fixer/latest?symbols=EUR%2CUSD&base=CZK`,
    headers
  );

  // Convert response data to JSON string
  var json = JSON.stringify(response.data);

  // Write JSON string to file
  fs.writeFile("./data/currency.json", json, "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
};

/**
 * Connects to the Fixer API and fetches the latest currency exchange rates if necessary
 */
const fixerConnect = async () => {
  // Find timestamp document for current API key
  const timestamp = await Timestamp.findOne({
    apiKey: process.env.FIXER_API_KEY,
  });

  // If timestamp document exists, check if it's been more than 24 hours since last update
  if (timestamp) {
    const timeDifference = Date.now() - timestamp.updatedAt;
    if (timeDifference > 86400000) {
      // If more than 24 hours have passed, update timestamp and fetch latest exchange rates
      timestamp.updatedAt = new Date();
      await timestamp.save();
      await fetchCurrency();
    }
  } else {
    // If timestamp document doesn't exist, create it and fetch latest exchange rates
    await Timestamp.create({
      apiKey: process.env.FIXER_API_KEY,
      user: process.env.FIXER_USER_ID,
    });
    await fetchCurrency();
  }
};

// Export the fixerConnect function for use in other modules
module.exports = { fixerConnect };
