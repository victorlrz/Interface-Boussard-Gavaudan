// const path = "C:/Users/victo/Desktop/T6_Roll050820_ex_victor.csv";
const XLSX = require("xlsx");
const CSVToJSON = require("csvtojson");
const fs = require("fs");
const { Parser } = require("json2csv");

// Converter XLSX to JSON

function getSheetData(fileAbsPath) {
  const workbook = XLSX.readFile(fileAbsPath);
  const worksheet = workbook.Sheets["BGFUND"];
  const headers = {};
  let data = [];
  for (cell in worksheet) {
    //Pour toutes les cellules non vides de la feuille
    //cell = for example "T65" || "A1" ...
    if (cell[0] === "!") continue;
    //parse out the column, row, and value
    const col = cell.replace(/[0-9]/g, "");
    const row = parseInt(cell.replace(/\D/g, ""));
    const value = worksheet[cell].v; //-> Value de la cellule worksheet[cellName]

    //store header names
    if (row == 1) {
      headers[col] = value;
      continue;
    }

    if (!data[row]) data[row] = {};
    data[row][headers[col]] = value;
  }
  //drop those first two rows which are empty
  data.shift();
  data.shift();
  return data;
}

// Convert CSV file to JSON array
const csvToJson = async (csvFilePath) => {
  try {
    const dataJSON = await CSVToJSON().fromFile(csvFilePath);

    // log the JSON array
    return dataJSON;
  } catch (err) {
    console.log(err);
  }
};
var json2csv = require("async-json2csv");

const jsonTocsv = async (json) => {
  const options = {
    data: json,
    fields: [
      "Portfolio",
      "Trade",
      "INSTR NAME",
      "Ticker",
      "LatestSpecialSit",
      "REFERENCE",
      "Sicovam",
      "Market",
      "QtyInBook",
      "TargetWght",
      "Last EUR",
      "AdjustedWght",
      "AUM",
      "Delta EUR",
      "QtyTarget",
      "QtyToTrade",
      "Direction",
      "AbsQtyToTrade",
      "Discretionnary Adj",
      "To Trade Long",
      "Long Move Date",
      "To Trade Short",
      "Short Move Date",
      "Delta",
      "Relative Delta",
      "Action",
    ],
    header: true,
  };
  try {
    var csv = await json2csv(options);
    console.log(csv);
    const d = new Date();
    const date =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      "-" +
      d.getHours() +
      "-" +
      d.getMinutes() +
      "-" +
      d.getSeconds();
    fs.writeFile(`./output/output_${date}.csv`, csv, function (err, data) {
      if (err) {
        return console.log(err);
      }
      console.log(data);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  csvToJson,
  jsonTocsv,
};
