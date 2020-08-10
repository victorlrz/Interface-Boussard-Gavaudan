const router = require("express").Router();
const convertJsonCsv = require("../public/javascript/server/data");

router.post("/api/data", async (req, res) => {
  //   console.log(req.body); //Debug
  await convertJsonCsv.jsonTocsv(req.body);
  res.status(200).send("Json successfully converted");
});

module.exports = router;
