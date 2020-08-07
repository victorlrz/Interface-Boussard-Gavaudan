function marketDataset(name, dataset) {
  this.name = name;
  this.dataset = dataset;
}

const getYaxisMktDataset = (data) => {
  const size = Object.keys(data[0]).length - 1;
  const bbgTickers = Object.getOwnPropertyNames(data[0]);
  // let bgTickers = [];
  // bgTickers.push(
  //   bbgTickers[j] +
  //     "." +
  //     Object.getOwnPropertyNames(data[0][bbgTickers[j]])[0]
  // );
  bbgTickers.shift(); //On enlève le premier élément (field1)
  let marketDatasets = [];

  for (let j = 0; j < size; j++) {
    let marketValues = []; //Contient les différentes valeurs statistiques d'un bgTicker
    for (let i = 0; i < data.length; i++) {
      marketValues.push(Object.values(data[i][bbgTickers[j]])[0]); //Les 262 valeurs du bgTicker[j]
    }

    marketDatasets.push(
      new marketDataset(
        bbgTickers[j] +
          "." +
          Object.getOwnPropertyNames(data[0][bbgTickers[j]])[0], //équivalent à bbgTickers + bgTickers
        marketValues
      )
    );
  }
  return marketDatasets;
};

const getXaxisMktDataset = (data) => {
  let dateDataset = [];
  for (let i = 0; i < data.length; i++) {
    let date = data[i].field1.slice(0, 10).split("-");
    dateDataset.push(`${date[2]}.${date[1]}.${date[0]}`);
  }
  return dateDataset;
};

export { getYaxisMktDataset, getXaxisMktDataset };
