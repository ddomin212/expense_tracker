const { DeGiroEnums } = require("degiro-api");
const DeGiro = require("degiro-api").default;
const { PORTFOLIO_POSITIONS_TYPE_ENUM } = DeGiroEnums;

const connectDegiro = async (username, pwd) => {
  const degiro = DeGiro.create({
    username,
    pwd,
  });

  await degiro.login();

  const portfolio = await degiro.getPortfolio({
    type: PORTFOLIO_POSITIONS_TYPE_ENUM.ALL,
    getProductDetails: true,
  });

  return portfolio;
};
module.exports = connectDegiro;
