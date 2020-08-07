import { getDataStrategy, getDataMarket } from "./01_getdata.js";
import { setDataDOM } from "./02_setdata.js";
import { getYaxisMktDataset, getXaxisMktDataset } from "./03_getchartdata.js";

const arrowLeft = document.querySelector(".arrow.arrow--left");
const arrowRight = document.querySelector(".arrow.arrow--right");

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
    console.log(dataMktCharts);
    const nbrClick = dataStrategy.length - 1;
    if (arrowLeft && arrowRight && nbrClick) {
      arrowLeft.style.setProperty("visibility", "hidden");
      let compt = 0;
      setDataDOM(dataStrategy, compt);
      arrowLeft.addEventListener("click", (event) => {
        if (compt !== 0) {
          compt--;
          arrowRight.style.setProperty("visibility", "visible");
          setDataDOM(dataStrategy, compt);
        }
        if (compt == 0) {
          arrowLeft.style.setProperty("visibility", "hidden");
        }
        event.stopPropagation();
      });

      arrowRight.addEventListener("click", (event) => {
        if (compt < nbrClick) {
          compt++;
          arrowLeft.style.setProperty("visibility", "visible");
          setDataDOM(dataStrategy, compt);
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

const ctx = document.getElementById("myChart").getContext("2d");

let pricesDataset = [500, 50, 2424, 14040, 14141, 4111, 4544, 47, 5555, 6811];
let tickersDataset = [
  "Tokyo",
  "Mumbai",
  "Mexico City",
  "Shanghai",
  "Sao Paulo",
  "New York",
  "Karachi",
  "Buenos Aires",
  "Delhi",
  "Moscow",
];

let myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: tickersDataset,
    datasets: [
      {
        data: pricesDataset, // Specify the data values array
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
        console.log(
          tickersDataset[item[0]._index],
          pricesDataset[item[0]._index]
        );
      }
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        },
      },
    },
  },
});
