const setDataDOM = (data, index) => {
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

  data[index]["Ticker"].length == 0
    ? (tckrName.innerHTML = "-")
    : (tckrName.innerHTML = data[index]["Ticker"]);
  data[index]["INSTR NAME"].length == 0
    ? (instrName.innerHTML = "-")
    : (instrName.innerHTML = data[index]["INSTR NAME"]);
  data[index]["QtyInBook"].length == 0
    ? (qtyInBook.innerHTML = "-")
    : (qtyInBook.innerHTML = data[index]["QtyInBook"]);
  data[index]["Last EUR"].length == 0
    ? (lastEur.innerHTML = "-")
    : (lastEur.innerHTML = data[index]["Last EUR"]);
  data[index]["Direction"].length == 0
    ? (direction.innerHTML = "-")
    : (direction.innerHTML = data[index]["Direction"]);
  data[index]["Discretionnary Adj"].length == 0
    ? (discrAdj.innerHTML = "-")
    : (discrAdj.innerHTML = data[index]["Discretionnary Adj"]);
  data[index]["To Trade Long"].length == 0
    ? (toTradeLong.innerHTML = "-")
    : (toTradeLong.innerHTML = data[index]["To Trade Long"]);
  data[index]["Long Move Date"].length == 0
    ? (longMoveDate.innerHTML = "-")
    : (longMoveDate.innerHTML = data[index]["Long Move Date"]);
  data[index]["To Trade Short"].length == 0
    ? (toTradeShort.innerHTML = "-")
    : (toTradeShort.innerHTML = data[index]["To Trade Short"]);
  data[index]["Short Move Date"].length == 0
    ? (shortMoveDate.innerHTML = "-")
    : (shortMoveDate.innerHTML = data[index]["Short Move Date"]);
  data[index]["Delta"].length == 0
    ? (delta.innerHTML = "-")
    : (delta.innerHTML = data[index]["Delta"]);
  data[index]["Relative Delta"].length == 0
    ? (relativeDelta.innerHTML = "-")
    : (relativeDelta.innerHTML = data[index]["Relative Delta"]);
};

export { setDataDOM };
