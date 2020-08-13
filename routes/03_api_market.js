const router = require("express").Router();
const dataMarket = require("../public/javascript/server/data");
//Path du fichier contenant l'historique des données de marché
const pathCsvFile = "C:/Users/victo/Desktop/data_victor.csv";

router.get("/api/market", async (req, res) => {
  const dataMkt = await dataMarket.csvToJson(pathCsvFile);
  const yearDataMkt = dataMkt.slice(dataMkt.length - 262, dataMkt.length);
  res.send(yearDataMkt);
});

module.exports = router;
