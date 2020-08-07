function addData(chart, label, data) {
  for (let i = 0; i < label.length; i++) {
    chart.data.labels.push(label[i]);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data[i]);
    });
  }

  chart.update();
}

function removeData(chart) {
  chart.data.labels = [];
  chart.data.datasets.forEach((dataset) => {
    dataset.data = [];
  });
  chart.update();
}

export { addData, removeData };
