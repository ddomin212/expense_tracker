const { DeGiroEnums } = require("degiro-api");
const DeGiro = require("degiro-api").default;
const { PORTFOLIO_POSITIONS_TYPE_ENUM } = DeGiroEnums;

/**
 * Connects to DeGiro API using provided username and password
 * @param {string} username - DeGiro account username
 * @param {string} pwd - DeGiro account password
 * @returns {Promise} - Promise that resolves to the user's portfolio
 */
const connectDegiro = async (username, pwd) => {
  // Create a new DeGiro instance with provided credentials
  const degiro = DeGiro.create({
    username,
    pwd,
  });

  // Login to DeGiro API
  await degiro.login();

  // Get the user's portfolio with all positions and product details
  const portfolio = await degiro.getPortfolio({
    type: PORTFOLIO_POSITIONS_TYPE_ENUM.ALL,
    getProductDetails: true,
  });

  // Return the user's portfolio
  return portfolio;
};

// Export the connectDegiro function for use in other modules
module.exports = connectDegiro;
