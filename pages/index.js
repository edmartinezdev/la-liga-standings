import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

export default function Home() {
  const [laLigaStandings, setLaLigaStandings] = useState([]);
  const [f1Standings, setF1Standings] = useState([]);
  const [f1Calendar, setF1Calendar] = useState([]);
  const [loading, setLoading] = useState({laLiga: true, f1: true, f1Calendar: true});
  const [error, setError] = useState({laLiga: null, f1: null, f1Calendar: null});
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    // Set the current date as the last update time
    const now = new Date();
    setLastUpdate(now.toLocaleDateString());
    
    // Fetch the La Liga standings data
    fetch('/standings.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLaLigaStandings(data);
        setLoading(prev => ({...prev, laLiga: false}));
      })
      .catch(err => {
        console.error('Error fetching La Liga standings data:', err);
        setError(prev => ({...prev, laLiga: 'Error loading La Liga standings data. Please try again later.'}));
        setLoading(prev => ({...prev, laLiga: false}));
      });
    
    // Fetch the F1 standings data
    fetch('/f1-standings.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setF1Standings(data);
        setLoading(prev => ({...prev, f1: false}));
      })
      .catch(err => {
        console.error('Error fetching F1 standings data:', err);
        setError(prev => ({...prev, f1: 'Error loading Formula 1 standings data. Please try again later.'}));
        setLoading(prev => ({...prev, f1: false}));
      });
      
    // Fetch the F1 calendar data
    fetch('/f1-calendar.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setF1Calendar(data);
        setLoading(prev => ({...prev, f1Calendar: false}));
      })
      .catch(err => {
        console.error('Error fetching F1 calendar data:', err);
        setError(prev => ({...prev, f1Calendar: 'Error loading Formula 1 calendar data. Please try again later.'}));
        setLoading(prev => ({...prev, f1Calendar: false}));
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
          <TabsTrigger value="formula1" className="data-[state=active]:border-b-2 data-[state=active]:border-[#003366] data-[state=active]:font-semibold">Formula 1</TabsTrigger>
          <TabsTrigger value="f1-calendar" className="data-[state=active]:border-b-2 data-[state=active]:border-[#003366] data-[state=active]:font-semibold">F1 Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="la-liga">
          <div id="standings">
            {loading.laLiga ? (
              <p className="loading">Loading standings data...</p>
            ) : error.laLiga ? (
              <p style={{ color: 'red', textAlign: 'center' }}>{error.laLiga}</p>
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
                  {laLigaStandings.map((team, index) => (
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
        
        <TabsContent value="formula1">
          <div id="f1-standings">
            {loading.f1 ? (
              <p className="loading">Loading Formula 1 standings data...</p>
            ) : error.f1 ? (
              <p style={{ color: 'red', textAlign: 'center' }}>{error.f1}</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Pos</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {f1Standings.map((driver, index) => (
                    <tr key={index}>
                      <td>{driver.position}</td>
                      <td>{driver.driver}</td>
                      <td>{driver.team}</td>
                      <td>{driver.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="f1-calendar">
          <div id="f1-calendar">
            {loading.f1Calendar ? (
              <p className="loading">Loading Formula 1 calendar data...</p>
            ) : error.f1Calendar ? (
              <p style={{ color: 'red', textAlign: 'center' }}>{error.f1Calendar}</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Grand Prix</th>
                    <th>Circuit</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {f1Calendar.map((race, index) => (
                    <tr key={index}>
                      <td>{race.grandPrix}</td>
                      <td>{race.circuit}</td>
                      <td>{race.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <footer>
        <p>Data provided by API-SPORTS | Last updated: <span>{lastUpdate}</span></p>
      </footer>
    </div>
  );
}