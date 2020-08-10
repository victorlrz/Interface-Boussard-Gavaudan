import { getDataStrategy, getDataMarket } from "./01_getdata.js";
import { setDataDOM } from "./02_setdata.js";
import { getYaxisMktDataset, getXaxisMktDataset } from "./03_getdatachart.js";
import { addData, removeData } from "./04_setdatachart.js";
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
    let dataStrategy = values[0];
    let dataMktCharts = values[1];
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
                  display: false,
                },
                gridLines: {
                  display: false,
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
      setAction(dataStrategy);
      setAllDatasToDOM(dataStrategy, dataMktCharts, myChart, compt);
      arrowLeft.addEventListener("click", (event) => {
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

// Chart.defaults.LineWithLine = Chart.defaults.line;
// Chart.controllers.LineWithLine = Chart.controllers.line.extend({
//   draw: function (ease) {
//     Chart.controllers.line.prototype.draw.call(this, ease);

//     if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
//       var activePoint = this.chart.tooltip._active[0],
//         ctx = this.chart.ctx,
//         x = activePoint.tooltipPosition().x,
//         topY = this.chart.legend.bottom,
//         bottomY = this.chart.chartArea.bottom;

//       // draw line
//       ctx.save();
//       ctx.beginPath();
//       ctx.moveTo(x, topY);
//       ctx.lineTo(x, bottomY);
//       ctx.lineWidth = 2;
//       ctx.strokeStyle = "#07C";
//       ctx.stroke();
//       ctx.restore();
//     }
//   },
// });
