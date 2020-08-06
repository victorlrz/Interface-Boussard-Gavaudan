//Router
const home = require("./01_home");
const strategy = require("./02_api_strategy");
const market = require("./03_api_market");

module.exports = (app) => {
  //Routes
  app.use(home);
  app.use(strategy);
  app.use(market);
};
