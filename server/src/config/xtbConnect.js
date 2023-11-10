const XAPI = require("xapi-node");
const fs = require("fs");

/**
 * Saves the provided trades to a JSON file
 * @param {Array} trades - Array of trades to save
 */
const saveXTBFetch = (trades) => {
  // Convert trades array to JSON string
  var json = JSON.stringify(trades);

  // Write JSON string to file
  fs.writeFile("./data/xtb.json", json, "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
};

/**
 * Connects to the XTB API using provided credentials and saves various responses as files
 * @param {string} xtbId - XTB account ID
 * @param {string} xtbPass - XTB account password
 */
const connectXTB = async (xtbId, xtbPass) => {
  // Create a new XAPI instance with provided credentials
  const x = new XAPI.default({
    accountId: xtbId,
    password: xtbPass,
    host: "ws.xtb.com",
    type: "real",
  });

  // Connect to XTB API
  x.connect();

  // Save various responses as files because promises drive me crazy
  x.onReady(() => {
    console.log("Connection is ready");

    // Get trades and save to file
    x.Socket.send
      .getTrades(false)
      .then((trades) => {
        return trades;
      })
      .then(saveXTBFetch)
      .catch((err) => {
        console.log(err);
      });

    // Get current user data and save to file
    x.Socket.send
      .getCurrentUserData()
      .then(saveXTBFetch)
      .catch((err) => {
        console.log(err);
      });

    // Get margin level and save to file
    x.Socket.send
      .getMarginLevel()
      .then(saveXTBFetch)
      .catch((err) => {
        console.log(err);
      });

    // Disconnect from XTB API and log message
    x.disconnect()
      .then(() => {
        console.log("Disconnected");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

// Export the connectXTB function for use in other modules
module.exports = connectXTB;
