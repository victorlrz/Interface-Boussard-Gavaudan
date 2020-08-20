import { addData, removeData } from "./04_setdatachart.js";

const setDataDOM = (dataStrt, index) => {
  const tckrName = document.querySelector(".ticker-name");
  const instrName = document.querySelector(".instrName");
  const qtyInBook = document.querySelector(".qtyInBook");
  const lastEur = document.querySelector(".lastEur");
  const direction = document.querySelector(".direction");
  const discrAdj = document.querySelector(".discrAdj");
  const toTradeLong = document.querySelector(".toTradeLong");
  const longMoveDate = document.querySelector(".longMoveDate");
  const toTradeShort = document.querySelector(".toTradeShort");
  const shortMoveDate = document.querySelector(".shortMoveDate");
  const delta = document.querySelector(".delta");
  const relativeDelta = document.querySelector(".relativeDelta");
  const action = document.querySelector(".title-content-span.action");
  try {
    dataStrt[index]["Ticker"].length == 0
      ? (tckrName.innerHTML = "—")
      : (tckrName.innerHTML = dataStrt[index]["Ticker"]);
    dataStrt[index]["INSTR NAME"].length == 0
      ? (instrName.innerHTML = "—")
      : (instrName.innerHTML = `${dataStrt[index]["INSTR NAME"]} -`);
    dataStrt[index]["QtyInBook"].length == 0
      ? (qtyInBook.innerHTML = "—")
      : (qtyInBook.innerHTML = dataStrt[index]["QtyInBook"]);
    dataStrt[index]["Last EUR"].length == 0
      ? (lastEur.innerHTML = "—")
      : (lastEur.innerHTML = dataStrt[index]["Last EUR"]);
    dataStrt[index]["Direction"].length == 0
      ? (direction.innerHTML = "—")
      : (direction.innerHTML = dataStrt[index]["Direction"]);
    dataStrt[index]["Discretionnary Adj"].length == 0
      ? (discrAdj.innerHTML = "—")
      : (discrAdj.innerHTML = dataStrt[index]["Discretionnary Adj"]);
    dataStrt[index]["To Trade Long"].length == 0
      ? (toTradeLong.innerHTML = "—")
      : (toTradeLong.innerHTML = dataStrt[index]["To Trade Long"]);
    dataStrt[index]["Long Move Date"].length == 0
      ? (longMoveDate.innerHTML = "—")
      : (longMoveDate.innerHTML = dataStrt[index]["Long Move Date"]);
    dataStrt[index]["To Trade Short"].length == 0
      ? (toTradeShort.innerHTML = "—")
      : (toTradeShort.innerHTML = dataStrt[index]["To Trade Short"]);
    dataStrt[index]["Short Move Date"].length == 0
      ? (shortMoveDate.innerHTML = "—")
      : (shortMoveDate.innerHTML = dataStrt[index]["Short Move Date"]);
    dataStrt[index]["Delta"].length == 0
      ? (delta.innerHTML = "—")
      : (delta.innerHTML = dataStrt[index]["Delta"]);
    dataStrt[index]["Relative Delta"].length == 0
      ? (relativeDelta.innerHTML = "—")
      : (relativeDelta.innerHTML = dataStrt[index]["Relative Delta"]);
    dataStrt[index].Action.length == 0
      ? (action.innerHTML = "—")
      : (action.innerHTML = `&nbsp${dataStrt[index].Action}`);

    dataStrt[index].Action == "OK"
      ? action.style.setProperty("color", "#04647e")
      : dataStrt[index].Action == "NOT OK"
      ? action.style.setProperty("color", "rgb(255, 80, 0)")
      : dataStrt[index].Action == "TO CHECK"
      ? action.style.setProperty("color", "#faa307")
      : action.style.setProperty("color", "black");
  } catch {
    alert(
      "Le fichier de la route 02_api_strategy n'est pas valide (erreur de format || data) ! "
    );
  }
};

const indexOfDataset = (dataStrt, dataMkt, index) => {
  const splitTckrName = dataStrt[index]["Ticker"].split(" ");
  const tickerName = `${splitTckrName[0]}.${splitTckrName[1]}`;
  for (let i = 0; i < dataMkt.length; i++) {
    if (tickerName == dataMkt[i].name) {
      return i;
    }
  }
};

const setAllDatasToDOM = (dataStrt, dataMkt, chart, index) => {
  setDataDOM(dataStrt, index);
  removeData(chart);
  addData(
    chart,
    dataMkt[1],
    dataMkt[0][indexOfDataset(dataStrt, dataMkt[0], index)].dataset
  );
};

export { setAllDatasToDOM };
