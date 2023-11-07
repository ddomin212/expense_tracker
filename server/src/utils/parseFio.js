const axios = require("axios");
const parseDate = require("./parseDate");

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
module.exports = loopData;
