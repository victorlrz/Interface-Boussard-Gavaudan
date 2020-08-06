// const path = "C:/Users/victo/Desktop/T6_Roll050820_ex_victor.csv";
const XLSX = require("xlsx");
const CSVToJSON = require("csvtojson");

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

module.exports = {
  csvToJson,
};
