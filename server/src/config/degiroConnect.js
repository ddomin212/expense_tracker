const { DeGiroEnums, DeGiroTypes } = require("degiro-api");
const DeGiro = require("degiro-api").default;
const { PORTFOLIO_POSITIONS_TYPE_ENUM } = DeGiroEnums;

const connectDegiro = async () => {
  const degiro = DeGiro.create({
    username: "gouda585",
    pwd: "Stdomin90bb5",
  });

  await degiro.login();

  const portfolio = await degiro.getPortfolio({
    type: PORTFOLIO_POSITIONS_TYPE_ENUM.ALL,
    getProductDetails: true,
  });
  return portfolio;
};
module.exports = connectDegiro;
