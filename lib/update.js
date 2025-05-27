const { fetchStandings, fetchF1Standings, fetchF1Calendar } = require('./scraper');

// Run the functions to fetch and save standings
(async () => {
  await fetchStandings();
  await fetchF1Standings();
  await fetchF1Calendar();
})();