# La Liga Standings

This project fetches and displays the current La Liga standings data using a free soccer API.

## Usage

1. Clone the repository:
   ```
   git clone https://github.com/edmartinezdev/la-liga-standings.git
   cd la-liga-standings
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Update standings data:
   ```
   npm run update
   ```
   This will fetch the latest La Liga standings data and save it to the `standings.json` file.

## Using a Real API

The script is configured to use the API-SPORTS API. To use the real API instead of mock data:

1. Sign up for a free API key at [API-SPORTS](https://api-sports.io/).
2. Open the `scraper.js` file and replace `YOUR_API_KEY` with your actual API key:
   ```javascript
   const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key
   ```

## Data Structure

The standings data is stored in the following format:

```json
[
  {
    "position": "1",
    "team": "Real Madrid",
    "played": "38",
    "points": "89"
  },
  ...
]
```

Each entry in the array represents a team with its league position, name, games played, and points earned.