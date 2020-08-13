const router = require("express").Router();
const dataStrategy = require("../public/javascript/server/data");
//Path du fichier contenant les données des BBGTickers : INSTR NAME, Ticker, LatestSpecialSit ...
const pathCsvFile = "C:/Users/victo/Desktop/T6_Roll050820_ex_victor (2).csv";

router.get("/api/strategy", async (req, res) => {
  const dataStrat = await dataStrategy.csvToJson(pathCsvFile);
  res.send(dataStrat);
});

module.exports = router;
