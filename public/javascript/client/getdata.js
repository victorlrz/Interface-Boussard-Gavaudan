const getDataMarket = async () => {
  const url = "http://localhost:5000/api/market";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const dataAPI = await response.json();
      return dataAPI;
    }
  } catch (e) {
    console.error("e : ", e);
  }
};

const getDataStrategy = async () => {
  const url = "http://localhost:5000/api/strategy";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const dataAPI = await response.json();
      return dataAPI;
    }
  } catch (e) {
    console.error("e : ", e);
  }
};

export { getDataStrategy, getDataMarket };
