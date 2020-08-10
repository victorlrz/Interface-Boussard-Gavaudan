const action = document.querySelector(".title-content-span.action");

const setAction = (data) => {
  const ok = document.querySelector(".btn-ctn.green");
  const toCheck = document.querySelector(".btn-ctn.yellow");
  const notOk = document.querySelector(".btn-ctn.red");

  ok.addEventListener("click", (e) => {
    action.innerHTML = "&nbspOK";
    action.style.setProperty("color", "#04647e");
    data[action.dataset.value].Action = "OK";
    checkNbrModif(data);
    e.stopPropagation();
    // console.log(action.dataset.value);
    // console.log(data[action.dataset.value]);
  });

  notOk.addEventListener("click", (e) => {
    action.innerHTML = "&nbspNOT OK";
    action.style.setProperty("color", "rgb(255, 80, 0)");
    data[action.dataset.value].Action = "NOT OK";
    checkNbrModif(data);
    e.stopPropagation();
    // console.log(action.dataset.value);
    // console.log(data[action.dataset.value]);
  });

  toCheck.addEventListener("click", (e) => {
    action.innerHTML = "&nbspTO CHECK";
    action.style.setProperty("color", "#faa307");
    data[action.dataset.value].Action = "TO CHECK";
    checkNbrModif(data);
    e.stopPropagation();
    // console.log(action.dataset.value);
    // console.log(data[action.dataset.value]);
  });
};

const checkNbrModif = (data) => {
  let compt = 0;
  for (let i = 0; i < data.length; i++) {
    if (
      data[i].Action === "OK" ||
      data[i].Action === "NOT OK" ||
      data[i].Action === "TO CHECK"
    ) {
      compt++;
    }
  }
  if (compt == data.length) {
    displayDownloadButton();
    downloadData(data);
  }
};

const displayDownloadButton = () => {
  const downloadButton = document.querySelector(".buttonDownload");
  downloadButton.style.setProperty("visibility", "visible");
};

function outputDataset(data) {
  const outputDataset = [];
  for (let i = 0; i < data.length; i++) {
    let outputDataLine = new Object();
    outputDataLine["Portfolio"] = data[i]["Portfolio"];
    outputDataLine["Trade"] = data[i]["Trade"];
    outputDataLine["INSTR NAME"] = data[i]["INSTR NAME"];
    outputDataLine["Ticker"] = data[i]["Ticker"];
    outputDataLine["LatestSpecialSit"] = data[i]["LatestSpecialSit"];
    outputDataLine["REFERENCE"] = data[i]["REFERENCE"];
    outputDataLine["Sicovam"] = data[i]["Sivocam"];
    outputDataLine["Market"] = data[i]["Market"];
    outputDataLine["QtyInBook"] = data[i]["QtyInBook"];
    outputDataLine["TargetWght"] = data[i]["TargetWght"];
    outputDataLine["Last EUR"] = data[i]["Last EUR"];
    outputDataLine["AdjustedWght"] = data[i]["AdjustedWght"];
    outputDataLine["AUM"] = data[i]["AUM"];
    outputDataLine["Delta EUR"] = data[i]["Delta EUR"];
    outputDataLine["QtyTarget"] = data[i]["QtyTarget"];
    outputDataLine["QtyToTrade"] = data[i]["QtyToTrade"];
    outputDataLine["Direction"] = data[i]["Direction"];
    outputDataLine["AbsQtyToTrade"] = data[i]["AbsQtyToTrade"];
    outputDataLine["Discretionnary Adj"] = data[i]["Discretionnary Adj"];
    outputDataLine["To Trade Long"] = data[i]["To Trade Long"];
    outputDataLine["Long Move Date"] = data[i]["Long Move Date"];
    outputDataLine["To Trade Short"] = data[i]["To Trade Short"];
    outputDataLine["Short Move Date"] = data[i]["Short Move Date"];
    outputDataLine["Delta"] = data[i]["Delta"];
    outputDataLine["Relative Delta"] = data[i]["Relative Delta"];
    outputDataLine["Action"] = data[i]["Action"];
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

const downloadData = (data) => {
  const downloadButton = document.querySelector(".buttonDownload");
  downloadButton.addEventListener(
    "click",
    function () {
      exportData(outputDataset(data));
    },
    { once: true }
  );
};

export { setAction };
