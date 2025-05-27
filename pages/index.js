import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

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
      
      <Tabs defaultValue="la-liga" className="w-full">
        <TabsList className="w-full mb-4 border-b">
          <TabsTrigger value="la-liga" className="data-[state=active]:border-b-2 data-[state=active]:border-[#003366] data-[state=active]:font-semibold">La Liga</TabsTrigger>
          <TabsTrigger value="future" className="data-[state=active]:border-b-2 data-[state=active]:border-[#003366] data-[state=active]:font-semibold">Future Development</TabsTrigger>
        </TabsList>
        
        <TabsContent value="la-liga">
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
        </TabsContent>
        
        <TabsContent value="future">
          <div className="p-4 text-center">
            <h2 className="text-xl font-semibold mb-4">Future Development</h2>
            <p className="text-gray-600">This tab is reserved for future content.</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <footer>
        <p>Data provided by API-SPORTS | Last updated: <span>{lastUpdate}</span></p>
      </footer>
    </div>
  );
}