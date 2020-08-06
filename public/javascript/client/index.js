import { getDataStrategy, getDataMarket } from "./getdata.js";
const arrowLeft = document.getElementById(".arrow arrow--left");
const arrowRight = document.getElementById(".arrow arrow--right");

const dataStrategy = async () => {
  const dataStrt = await getDataStrategy();
  return dataStrt;
};

const dataMarket = async () => {
  const dataMkt = await getDataMarket();
  return dataMkt;
};

Promise.all([dataStrategy(), dataMarket()]).then((values) => {
  console.log(values);
});

// const nbrClick = inputStratData.length;
// console.log(nbrClick);

if (arrowLeft && arrowRight && nbrClickX) {
  let compt = 0;
  let click = 0;
  arrowLeft.addEventListener("click", (event) => {
    click -= 1;
    arrowRight.style.setProperty("visibility", "visible");
    if (compt !== 0) {
      compt += lengthX;
      transformX.style.setProperty("transform", `translateX(${compt}%)`);
    }
    if (click == 0) {
      arrowLeft.style.setProperty("visibility", "hidden");
    }
    event.stopPropagation();
  });

  arrowRight.addEventListener("click", (event) => {
    click += 1;
    arrowLeft.style.setProperty("visibility", "visible");
    if (compt > -lengthX * nbrClickX) {
      compt -= lengthX;
      transformX.style.setProperty("transform", `translateX(${compt}%)`);
    }
    if (click >= nbrClickX) {
      arrowRight.style.setProperty("visibility", "hidden");
    }
    event.stopPropagation();
  });
}

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
