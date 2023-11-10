const XAPI = require("xapi-node");
const fs = require("fs");

const connectXTB = async (xtbId, xtbPass) => {
  const x = new XAPI.default({
    accountId: xtbId,
    password: xtbPass,
    host: "ws.xtb.com",
    type: "real",
  });
  x.connect();

  // save various responses as files because promises drive me crazy
  x.onReady(() => {
    console.log("Connection is ready");
    x.Socket.send
      .getTrades(false)
      .then((trades) => {
        return trades;
      })
      .then((trades) => {
        var json = JSON.stringify(trades);
        fs.writeFile("./data/xtb.json", json, "utf8", (err) => {
          if (err) {
            console.log(err);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    x.Socket.send
      .getCurrentUserData()
      .then((data) => {
        var json = JSON.stringify(data);
        fs.writeFile("./data/xtbUser.json", json, "utf8", (err) => {
          if (err) {
            console.log(err);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    x.Socket.send
      .getMarginLevel()
      .then((data) => {
        var json = JSON.stringify(data);
        fs.writeFile("./data/xtbMargin.json", json, "utf8", (err) => {
          if (err) {
            console.log(err);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    x.disconnect()
      .then(() => {
        console.log("Disconnected");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

module.exports = connectXTB;
