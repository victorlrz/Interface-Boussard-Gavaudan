import { setAllDatasToDOM } from "./02_setdata.js";
const action = document.querySelector(".title-content-span.action");
const arrowLeft = document.querySelector(".arrow.arrow--left");
const arrowRight = document.querySelector(".arrow.arrow--right");

const setAction = (dataStrt, dataMkt, chart) => {
  const ok = document.querySelector(".btn-ctn.green");
  const toCheck = document.querySelector(".btn-ctn.yellow");
  const notOk = document.querySelector(".btn-ctn.red");
  const nbrClick = dataStrt.length - 1;
  ok.addEventListener("click", (e) => {
    let compt = Number(action.dataset.value);
    action.innerHTML = "&nbspOK";
    action.style.setProperty("color", "#04647e");
    dataStrt[compt].Action = "OK";
    if (compt < nbrClick) {
      compt++;
      setAllDatasToDOM(dataStrt, dataMkt, chart, compt);
      action.dataset.value = compt;
      arrowLeft.style.setProperty("visibility", "visible");
    }
    if (compt == nbrClick) {
      arrowRight.style.setProperty("visibility", "hidden");
    }
    checkNbrModif(dataStrt);
    e.stopPropagation();
  });

  notOk.addEventListener("click", (e) => {
    let compt = Number(action.dataset.value);
    action.innerHTML = "&nbspNOT OK";
    action.style.setProperty("color", "rgb(255, 80, 0)");
    dataStrt[compt].Action = "NOT OK";
    if (compt < nbrClick) {
      compt++;
      setAllDatasToDOM(dataStrt, dataMkt, chart, compt);
      action.dataset.value = compt;
      arrowLeft.style.setProperty("visibility", "visible");
    }
    if (compt == nbrClick) {
      arrowRight.style.setProperty("visibility", "hidden");
    }
    checkNbrModif(dataStrt);
    e.stopPropagation();
  });

  toCheck.addEventListener("click", (e) => {
    let compt = Number(action.dataset.value);
    action.innerHTML = "&nbspTO CHECK";
    action.style.setProperty("color", "#faa307");
    dataStrt[action.dataset.value].Action = "TO CHECK";
    if (compt < nbrClick) {
      compt++;
      setAllDatasToDOM(dataStrt, dataMkt, chart, compt);
      action.dataset.value = compt;
      arrowLeft.style.setProperty("visibility", "visible");
    }
    if (compt == nbrClick) {
      arrowRight.style.setProperty("visibility", "hidden");
    }
    checkNbrModif(dataStrt);
    e.stopPropagation();
  });
};

const checkNbrModif = (dataStrt) => {
  let compt = 0;
  for (let i = 0; i < dataStrt.length; i++) {
    if (
      dataStrt[i].Action === "OK" ||
      dataStrt[i].Action === "NOT OK" ||
      dataStrt[i].Action === "TO CHECK"
    ) {
      compt++;
    }
  }
  if (compt == dataStrt.length) {
    displayDownloadButton();
    downloadData(dataStrt);
  }
};

const displayDownloadButton = () => {
  const downloadButton = document.querySelector(".buttonDownload");
  downloadButton.style.setProperty("visibility", "visible");
};

function outputDataset(dataStrt) {
  const outputDataset = [];
  for (let i = 0; i < dataStrt.length; i++) {
    let outputDataLine = new Object();
    outputDataLine["Portfolio"] = dataStrt[i]["Portfolio"];
    outputDataLine["Trade"] = dataStrt[i]["Trade"];
    outputDataLine["INSTR NAME"] = dataStrt[i]["INSTR NAME"];
    outputDataLine["Ticker"] = dataStrt[i]["Ticker"];
    outputDataLine["LatestSpecialSit"] = dataStrt[i]["LatestSpecialSit"];
    outputDataLine["REFERENCE"] = dataStrt[i]["REFERENCE"];
    outputDataLine["Sicovam"] = dataStrt[i]["Sivocam"];
    outputDataLine["Market"] = dataStrt[i]["Market"];
    outputDataLine["QtyInBook"] = dataStrt[i]["QtyInBook"];
    outputDataLine["TargetWght"] = dataStrt[i]["TargetWght"];
    outputDataLine["Last EUR"] = dataStrt[i]["Last EUR"];
    outputDataLine["AdjustedWght"] = dataStrt[i]["AdjustedWght"];
    outputDataLine["AUM"] = dataStrt[i]["AUM"];
    outputDataLine["Delta EUR"] = dataStrt[i]["Delta EUR"];
    outputDataLine["QtyTarget"] = dataStrt[i]["QtyTarget"];
    outputDataLine["QtyToTrade"] = dataStrt[i]["QtyToTrade"];
    outputDataLine["Direction"] = dataStrt[i]["Direction"];
    outputDataLine["AbsQtyToTrade"] = dataStrt[i]["AbsQtyToTrade"];
    outputDataLine["Discretionnary Adj"] = dataStrt[i]["Discretionnary Adj"];
    outputDataLine["To Trade Long"] = dataStrt[i]["To Trade Long"];
    outputDataLine["Long Move Date"] = dataStrt[i]["Long Move Date"];
    outputDataLine["To Trade Short"] = dataStrt[i]["To Trade Short"];
    outputDataLine["Short Move Date"] = dataStrt[i]["Short Move Date"];
    outputDataLine["Delta"] = dataStrt[i]["Delta"];
    outputDataLine["Relative Delta"] = dataStrt[i]["Relative Delta"];
    outputDataLine["Action"] = dataStrt[i]["Action"];
    outputDataset.push(outputDataLine);
  }
  return outputDataset;
}

const exportData = async (params) => {
  const url = "http://localhost:5000/api/data";
  const json = JSON.stringify(params);
  // console.log(json); //debug
  try {
    const response = await fetch(url, {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const dataAPI = await response.json();
      console.log(dataAPI);
    }
  } catch (err) {
    console.log(err);
  }
};

const downloadData = (dataStrt) => {
  const downloadButton = document.querySelector(".buttonDownload");
  downloadButton.addEventListener(
    "click",
    (event) => {
      exportData(outputDataset(dataStrt));
      alert("Fichier créé avec succès dans le dossier /output !");
      event.stopImmediatePropagation();
      event.stopPropagation();
    },
    { once: true }
  );
};

export { setAction };
