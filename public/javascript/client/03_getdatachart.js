function marketDataset(name, dataset) {
  this.name = name;
  this.dataset = dataset;
}

const getYaxisMktDataset = (data) => {
  try {
    // console.log(data);
    let tickers = [];

    for (const bbgTickers in data[0]) {
      if (bbgTickers !== "field1") {
        // console.log(bbgTickers, data[0][bbgTickers]); //Debug
        // console.log(bbgTickers, bgTickers, data[0][bbgTickers][bgTickers]); //Debug
        for (const bgTickers in data[0][bbgTickers]) {
          tickers.push(`${bbgTickers}.${bgTickers}`);
        }
      }
    }
    let marketDatasets = [];
    // console.log(data.length);
    for (let j = 0; j < tickers.length; j++) {
      const bbgTicker = tickers[j].split(".")[0];
      const bgTicker = tickers[j].split(".")[1];
      // console.log(bbgTicker, bgTicker); //DEBUG
      let marketValues = []; //Contient les différentes valeurs statistiques d'un bgTicker
      for (let i = 0; i < data.length; i++) {
        marketValues.push(data[i][bbgTicker][bgTicker]); //Les 262 valeurs du bgTicker[j]
      }
      marketDatasets.push(
        new marketDataset(
          tickers[j], //bbgTickers + bgTickers
          marketValues
        )
      );
    }
    return marketDatasets;
  } catch {
    alert(
      "Le fichier de la route 03_api_market n'est pas valide (erreur de format || data) ! Relancez le serveur après modification."
    );
  }
};

const getXaxisMktDataset = (data) => {
  try {
    let dateDataset = [];
    for (let i = 0; i < data.length; i++) {
      let date = data[i].field1.slice(0, 10).split("-");
      dateDataset.push(`${date[2]}.${date[1]}.${date[0]}`);
    }
    return dateDataset;
  } catch {
    alert(
      "Le fichier de la route 03_api_market n'est pas valide (erreur de format || data) ! Relancez le serveur après modification."
    );
  }
};

export { getYaxisMktDataset, getXaxisMktDataset };
