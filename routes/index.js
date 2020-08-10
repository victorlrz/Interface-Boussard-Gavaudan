//Router
const home = require("./01_home");
const strategy = require("./02_api_strategy");
const market = require("./03_api_market");
const jsonToCsv = require("./04_api_csv");

module.exports = (app) => {
  //Routes
  app.use(home);
  app.use(strategy);
  app.use(market);
  app.use(jsonToCsv);
};
