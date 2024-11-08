const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const URL = "https://www.skysports.com/la-liga-table"; // Replace with your URL

async function scrapeStandings() {
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);

    const standings = [];

    $("table#sdc-site-table--147 tbody tr").each((index, element) => {
      const position = $(element).find("td:nth-child(1)").text().trim();
      const team = $(element)
        .find("td:nth-child(2) .sdc-site-table__name-target")
        .text()
        .trim();
      const played = $(element).find("td:nth-child(3)").text().trim();
      const points = $(element).find("td:nth-child(10)").text().trim();

      standings.push({ position, team, played, points });
    });

    fs.writeFileSync("standings.json", JSON.stringify(standings, null, 2));
    console.log("Standings data saved to standings.json");
  } catch (error) {
    console.error("Error scraping data:", error);
  }
}

scrapeStandings();
