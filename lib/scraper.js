const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Mock API data for La Liga standings
// This simulates API response when network connectivity is restricted
function getMockData() {
  return {
    response: [
      {
        league: {
          standings: [
            [
              {
                rank: 1,
                team: {
                  name: "Real Madrid"
                },
                all: {
                  played: 38
                },
                points: 89
              },
              {
                rank: 2,
                team: {
                  name: "Barcelona"
                },
                all: {
                  played: 38
                },
                points: 85
              },
              {
                rank: 3,
                team: {
                  name: "Atletico Madrid"
                },
                all: {
                  played: 38
                },
                points: 77
              },
              {
                rank: 4,
                team: {
                  name: "Real Sociedad"
                },
                all: {
                  played: 38
                },
                points: 74
              },
              {
                rank: 5,
                team: {
                  name: "Villarreal"
                },
                all: {
                  played: 38
                },
                points: 68
              },
              {
                rank: 6,
                team: {
                  name: "Real Betis"
                },
                all: {
                  played: 38
                },
                points: 63
              },
              {
                rank: 7,
                team: {
                  name: "Athletic Bilbao"
                },
                all: {
                  played: 38
                },
                points: 59
              },
              {
                rank: 8,
                team: {
                  name: "Girona"
                },
                all: {
                  played: 38
                },
                points: 56
              },
              {
                rank: 9,
                team: {
                  name: "Osasuna"
                },
                all: {
                  played: 38
                },
                points: 53
              },
              {
                rank: 10,
                team: {
                  name: "Sevilla"
                },
                all: {
                  played: 38
                },
                points: 50
              },
              {
                rank: 11,
                team: {
                  name: "Valencia"
                },
                all: {
                  played: 38
                },
                points: 48
              },
              {
                rank: 12,
                team: {
                  name: "Mallorca"
                },
                all: {
                  played: 38
                },
                points: 47
              },
              {
                rank: 13,
                team: {
                  name: "Rayo Vallecano"
                },
                all: {
                  played: 38
                },
                points: 45
              },
              {
                rank: 14,
                team: {
                  name: "Getafe"
                },
                all: {
                  played: 38
                },
                points: 43
              },
              {
                rank: 15,
                team: {
                  name: "Celta Vigo"
                },
                all: {
                  played: 38
                },
                points: 40
              },
              {
                rank: 16,
                team: {
                  name: "Alaves"
                },
                all: {
                  played: 38
                },
                points: 39
              },
              {
                rank: 17,
                team: {
                  name: "Cadiz"
                },
                all: {
                  played: 38
                },
                points: 38
              },
              {
                rank: 18,
                team: {
                  name: "Granada"
                },
                all: {
                  played: 38
                },
                points: 31
              },
              {
                rank: 19,
                team: {
                  name: "Almeria"
                },
                all: {
                  played: 38
                },
                points: 30
              },
              {
                rank: 20,
                team: {
                  name: "Leganes"
                },
                all: {
                  played: 38
                },
                points: 29
              }
            ]
          ]
        }
      }
    ]
  };
}

// Function to determine the current season based on the date
function getCurrentSeason() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // January is 0
  const currentYear = currentDate.getFullYear();
  
  // If we're between January and July, we're in the previous year's season
  // If we're between August and December, we're in the current year's season
  return currentMonth >= 8 ? currentYear : currentYear - 1;
}

// API-SPORTS API for La Liga standings
const CURRENT_SEASON = getCurrentSeason();
const API_URL = `https://v3.football.api-sports.io/standings?league=140&season=${CURRENT_SEASON}`;
const API_KEY = "1bf4ff83c234abc234bd7b819c917e5e"; // API key for API-SPORTS

async function fetchStandings() {
  try {
    let data;
    
    console.log(`Fetching La Liga standings for the ${CURRENT_SEASON}-${CURRENT_SEASON + 1} season...`);
    
    try {
      // Try to fetch from the API
      const response = await axios.get(API_URL, {
        headers: {
          'x-apisports-key': API_KEY
        }
      });
      data = response.data;
    } catch (apiError) {
      console.log("Using mock data due to API connectivity issues.");
      // If API request fails, use mock data
      data = getMockData();
    }
    
    // Process the API response to match the existing data structure
    const standings = data.response[0].league.standings[0].map(team => {
      return {
        position: team.rank.toString(),
        team: team.team.name,
        played: team.all.played.toString(),
        points: team.points.toString()
      };
    });

    // Write to public directory for Next.js to access
    // Create public directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Now write the file
    const filePath = path.join(publicDir, 'standings.json');
    fs.writeFileSync(filePath, JSON.stringify(standings, null, 2));
    console.log("Standings data saved to public/standings.json");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Mock API data for F1 driver standings
// This simulates API response when network connectivity is restricted
function getF1MockData() {
  return {
    response: [
      {
        season: "2024",
        standings: [
          {
            position: 1,
            driver: {
              name: "Max Verstappen"
            },
            team: {
              name: "Red Bull Racing"
            },
            points: 237
          },
          {
            position: 2,
            driver: {
              name: "Lando Norris"
            },
            team: {
              name: "McLaren"
            },
            points: 197
          },
          {
            position: 3,
            driver: {
              name: "Charles Leclerc"
            },
            team: {
              name: "Ferrari"
            },
            points: 181
          },
          {
            position: 4,
            driver: {
              name: "Carlos Sainz"
            },
            team: {
              name: "Ferrari"
            },
            points: 165
          },
          {
            position: 5,
            driver: {
              name: "Lewis Hamilton"
            },
            team: {
              name: "Mercedes"
            },
            points: 142
          },
          {
            position: 6,
            driver: {
              name: "Sergio Perez"
            },
            team: {
              name: "Red Bull Racing"
            },
            points: 118
          },
          {
            position: 7,
            driver: {
              name: "George Russell"
            },
            team: {
              name: "Mercedes"
            },
            points: 105
          },
          {
            position: 8,
            driver: {
              name: "Oscar Piastri"
            },
            team: {
              name: "McLaren"
            },
            points: 91
          },
          {
            position: 9,
            driver: {
              name: "Fernando Alonso"
            },
            team: {
              name: "Aston Martin"
            },
            points: 49
          },
          {
            position: 10,
            driver: {
              name: "Lance Stroll"
            },
            team: {
              name: "Aston Martin"
            },
            points: 17
          },
          {
            position: 11,
            driver: {
              name: "Nico Hulkenberg"
            },
            team: {
              name: "Haas F1 Team"
            },
            points: 14
          },
          {
            position: 12,
            driver: {
              name: "Yuki Tsunoda"
            },
            team: {
              name: "RB"
            },
            points: 13
          },
          {
            position: 13,
            driver: {
              name: "Daniel Ricciardo"
            },
            team: {
              name: "RB"
            },
            points: 9
          },
          {
            position: 14,
            driver: {
              name: "Alexander Albon"
            },
            team: {
              name: "Williams"
            },
            points: 6
          },
          {
            position: 15,
            driver: {
              name: "Kevin Magnussen"
            },
            team: {
              name: "Haas F1 Team"
            },
            points: 5
          },
          {
            position: 16,
            driver: {
              name: "Esteban Ocon"
            },
            team: {
              name: "Alpine"
            },
            points: 4
          },
          {
            position: 17,
            driver: {
              name: "Pierre Gasly"
            },
            team: {
              name: "Alpine"
            },
            points: 3
          },
          {
            position: 18,
            driver: {
              name: "Zhou Guanyu"
            },
            team: {
              name: "Kick Sauber"
            },
            points: 0
          },
          {
            position: 19,
            driver: {
              name: "Logan Sargeant"
            },
            team: {
              name: "Williams"
            },
            points: 0
          },
          {
            position: 20,
            driver: {
              name: "Valtteri Bottas"
            },
            team: {
              name: "Kick Sauber"
            },
            points: 0
          }
        ]
      }
    ]
  };
}

// API-SPORTS API for F1 driver standings
const F1_API_URL = `https://v1.formula-1.api-sports.io/rankings/drivers?season=${new Date().getFullYear()}`;
const F1_CALENDAR_API_URL = `https://v1.formula-1.api-sports.io/races?season=${new Date().getFullYear()}`;

async function fetchF1Standings() {
  try {
    let data;
    
    console.log(`Fetching Formula 1 driver standings for the ${new Date().getFullYear()} season...`);
    
    try {
      // Try to fetch from the API
      const response = await axios.get(F1_API_URL, {
        headers: {
          'x-apisports-key': API_KEY
        }
      });
      data = response.data;
    } catch (apiError) {
      console.log("Using mock data for F1 due to API connectivity issues.");
      // If API request fails, use mock data
      data = getF1MockData();
    }
    
    // Process the API response to match the existing data structure
    const standings = data.response[0].standings.map(driver => {
      return {
        position: driver.position.toString(),
        driver: driver.driver.name,
        team: driver.team.name,
        points: driver.points.toString()
      };
    });

    // Write to public directory for Next.js to access
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Now write the file
    const filePath = path.join(publicDir, 'f1-standings.json');
    fs.writeFileSync(filePath, JSON.stringify(standings, null, 2));
    console.log("F1 standings data saved to public/f1-standings.json");
  } catch (error) {
    console.error("Error fetching F1 data:", error);
  }
}

// Mock API data for F1 calendar
// This simulates API response when network connectivity is restricted
function getF1CalendarMockData() {
  return {
    response: [
      {
        id: 1,
        competition: {
          name: "Bahrain Grand Prix"
        },
        circuit: {
          name: "Bahrain International Circuit"
        },
        date: "2024-03-02",
        season: 2024,
        type: "Race"
      },
      {
        id: 2,
        competition: {
          name: "Saudi Arabian Grand Prix"
        },
        circuit: {
          name: "Jeddah Corniche Circuit"
        },
        date: "2024-03-09",
        season: 2024,
        type: "Race"
      },
      {
        id: 3,
        competition: {
          name: "Australian Grand Prix"
        },
        circuit: {
          name: "Albert Park Circuit"
        },
        date: "2024-03-24",
        season: 2024,
        type: "Race"
      },
      {
        id: 4,
        competition: {
          name: "Japanese Grand Prix"
        },
        circuit: {
          name: "Suzuka Circuit"
        },
        date: "2024-04-07",
        season: 2024,
        type: "Race"
      },
      {
        id: 5,
        competition: {
          name: "Chinese Grand Prix"
        },
        circuit: {
          name: "Shanghai International Circuit"
        },
        date: "2024-04-21",
        season: 2024,
        type: "Race"
      },
      {
        id: 6,
        competition: {
          name: "Miami Grand Prix"
        },
        circuit: {
          name: "Miami International Autodrome"
        },
        date: "2024-05-05",
        season: 2024,
        type: "Race"
      },
      {
        id: 7,
        competition: {
          name: "Emilia Romagna Grand Prix"
        },
        circuit: {
          name: "Autodromo Enzo e Dino Ferrari"
        },
        date: "2024-05-19",
        season: 2024,
        type: "Race"
      },
      {
        id: 8,
        competition: {
          name: "Monaco Grand Prix"
        },
        circuit: {
          name: "Circuit de Monaco"
        },
        date: "2024-05-26",
        season: 2024,
        type: "Race"
      }
    ]
  };
}

async function fetchF1Calendar() {
  try {
    let data;
    
    console.log(`Fetching Formula 1 calendar for the ${new Date().getFullYear()} season...`);
    
    try {
      // Try to fetch from the API
      const response = await axios.get(F1_CALENDAR_API_URL, {
        headers: {
          'x-apisports-key': API_KEY
        }
      });
      data = response.data;
    } catch (apiError) {
      console.log("Using mock data for F1 calendar due to API connectivity issues.");
      // If API request fails, use mock data
      data = getF1CalendarMockData();
    }
    
    // Process the API response to match the desired data structure
    const calendar = data.response.filter(race => race.type === "Race").map(race => {
      // Convert date string to readable format
      const raceDate = new Date(race.date);
      const formattedDate = raceDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      return {
        grandPrix: race.competition.name,
        circuit: race.circuit.name,
        date: formattedDate
      };
    });

    // Write to public directory for Next.js to access
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Now write the file
    const filePath = path.join(publicDir, 'f1-calendar.json');
    fs.writeFileSync(filePath, JSON.stringify(calendar, null, 2));
    console.log("F1 calendar data saved to public/f1-calendar.json");
  } catch (error) {
    console.error("Error fetching F1 calendar data:", error);
  }
}

// Export the functions to be used by Next.js
module.exports = { fetchStandings, fetchF1Standings, fetchF1Calendar };