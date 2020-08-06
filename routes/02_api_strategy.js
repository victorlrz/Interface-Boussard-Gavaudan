const router = require("express").Router();
const dataStrategy = require("../public/javascript/server/data");
const pathCsvFile = "C:/Users/victo/Desktop/T6_Roll050820_ex_victor.csv";

router.get("/api/strategy", async (req, res) => {
  const dataStrat = await dataStrategy.csvToJson(pathCsvFile);
  res.send(dataStrat);
});

module.exports = router;
