import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    // Set the current date as the last update time
    const now = new Date();
    setLastUpdate(now.toLocaleDateString());
    
    // Fetch the standings data
    fetch('/standings.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStandings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching standings data:', err);
        setError('Error loading standings data. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Head>
        <title>La Liga Standings</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <h1>La Liga Standings</h1>
      
      <div id="standings">
        {loading ? (
          <p className="loading">Loading standings data...</p>
        ) : error ? (
          <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>Played</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr key={index}>
                  <td>{team.position}</td>
                  <td>{team.team}</td>
                  <td>{team.played}</td>
                  <td>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <footer>
        <p>Data provided by API-SPORTS | Last updated: <span>{lastUpdate}</span></p>
      </footer>
    </div>
  );
}