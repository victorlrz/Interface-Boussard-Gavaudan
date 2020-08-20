import { getDataStrategy, getDataMarket } from "./01_getdata.js";
import { setAllDatasToDOM } from "./02_setdata.js";
import { getYaxisMktDataset, getXaxisMktDataset } from "./03_getdatachart.js";
import { setAction } from "./05_setaction.js";

const arrowLeft = document.querySelector(".arrow.arrow--left");
const arrowRight = document.querySelector(".arrow.arrow--right");
const ctx = document.getElementById("myChart").getContext("2d");
const ratio = document.querySelector(".ratio");
const ratioDate = document.querySelector(".ratio-date");
const action = document.querySelector(".title-content-span.action");

const dataStrategy = async () => {
  const dataStrt = await getDataStrategy();
  return dataStrt;
};

const dataMarket = async () => {
  const dataMkt = await getDataMarket();
  const chartMktDatasets = [
    getYaxisMktDataset(dataMkt),
    getXaxisMktDataset(dataMkt),
  ];

  return chartMktDatasets;
};

Promise.all([dataStrategy(), dataMarket()])
  .then((values) => {
    let dataStrategy = values[0].sort(function compare(a, b) {
      if (a["To Trade Short"] < b["To Trade Short"]) return -1;
      if (a["To Trade Short"] > b["To Trade Short"]) return 1;
      return 0;
    });
    let dataMktCharts = values[1];
    // console.log(dataStrategy); //DEBUG
    // console.log(dataMktCharts); //DEBUG
    const nbrClick = dataStrategy.length - 1;
    if (arrowLeft && arrowRight && nbrClick) {
      arrowLeft.style.setProperty("visibility", "hidden");
      let compt = 0;

      let myChart = new Chart(ctx, {
        // type: "LineWithLine",
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              data: [], // Specify the data values array
              fill: false,
              borderColor: "#2196f3", // Add custom color border (Line)
              backgroundColor: "#2196f3", // Add custom color background (Points and Fill)
              borderWidth: 1, // Specify bar border width
            },
          ],
        },
        options: {
          responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
          legend: {
            display: false,
          },
          onHover: function (evt) {
            const item = myChart.getElementAtEvent(evt);
            if (item.length) {
              hoverValues(
                dataMktCharts[0][compt].dataset[item[0]._index],
                dataMktCharts[1][item[0]._index]
              );
            }
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  display: true, //Set false to delete xAxis label
                },
                gridLines: {
                  display: true, //Set false to delete grid background
                },
              },
            ],
          },
          tooltips: {
            // intersect: false,
            callbacks: {
              label: function (tooltipItem) {
                return tooltipItem.yLabel;
              },
            },
          },
        },
      });
      // console.log(dataMktCharts); //Debug
      setAllDatasToDOM(dataStrategy, dataMktCharts, myChart, compt);
      setAction(dataStrategy, dataMktCharts, myChart);
      arrowLeft.addEventListener("click", (event) => {
        compt = action.dataset.value;
        if (compt !== 0) {
          compt--;
          arrowRight.style.setProperty("visibility", "visible");
          setAllDatasToDOM(dataStrategy, dataMktCharts, myChart, compt);
          action.dataset.value = compt;
          ratio.innerHTML = "X,";
          ratioDate.innerHTML = "&nbspas of Date";
          event.stopPropagation();
        }
        if (compt == 0) {
          arrowLeft.style.setProperty("visibility", "hidden");
        }
      });
      arrowRight.addEventListener("click", (event) => {
        compt = action.dataset.value;
        if (compt < nbrClick) {
          compt++;
          arrowLeft.style.setProperty("visibility", "visible");
          setAllDatasToDOM(dataStrategy, dataMktCharts, myChart, compt);
          action.dataset.value = compt;
          ratio.innerHTML = "X,";
          ratioDate.innerHTML = "&nbspas of Date";
        }
        if (compt == nbrClick) {
          arrowRight.style.setProperty("visibility", "hidden");
        }
        event.stopPropagation();
      });
    }
  })
  .catch((reason) => {
    console.log(reason);
  });

const hoverValues = (ratiovalue, datevalue) => {
  ratio.innerHTML = ratiovalue + " ";
  ratioDate.innerHTML = `as of ${datevalue}`;
};
