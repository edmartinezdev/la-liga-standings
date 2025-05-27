const { fetchStandings, fetchF1Standings } = require('./scraper');

// Run the functions to fetch and save standings
(async () => {
  await fetchStandings();
  await fetchF1Standings();
})();