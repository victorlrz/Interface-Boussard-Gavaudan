export default async function Data() {
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
      console.log(dataAPI); //DEBUG
      // if (dataAPI[0]) {
      //   displayHeadlines(dataAPI);
      // } else {
      //   console.log("Pas de résultats, merci d'affiner votre recherche..");
      //   document.querySelector(".accordion").remove();
      // }
    }
  } catch (e) {
    console.error("e : ", e);
  }
}
