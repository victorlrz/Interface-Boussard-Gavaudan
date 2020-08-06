import { Data } from "./getdata";

const val = Data;
console.log(val);
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
