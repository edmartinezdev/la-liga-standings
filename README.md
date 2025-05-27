# La Liga Standings

This project fetches and displays the current La Liga standings data using a free soccer API. It's built with Next.js for a modern React-based web application. It also displays Formula 1 driver standings and race calendar.

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
   This will fetch the latest La Liga standings data, Formula 1 driver standings and Formula 1 calendar data, and save them to the `public` directory.

4. Run the website locally:
   ```
   npm run dev
   ```
   This will start a Next.js development server at http://localhost:3000.

5. Build for production:
   ```
   npm run build
   npm start
   ```
   This will create an optimized production build and start a server.

## Using a Real API

The script is configured to use the API-SPORTS API. To use the real API instead of mock data:

1. Sign up for a free API key at [API-SPORTS](https://api-sports.io/).
2. The project is already configured with an API key:
   ```javascript
   const API_KEY = "1bf4ff83c234abc234bd7b819c917e5e"; // API key for API-SPORTS
   ```

The script automatically determines the current football season based on the date:
- If the current month is between August and December, it uses the current year as the season
- If the current month is between January and July, it uses the previous year as the season

This ensures that the standings are always for the current season.

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

The Formula 1 calendar data is stored in the following format:

```json
[
  {
    "grandPrix": "Bahrain Grand Prix",
    "circuit": "Bahrain International Circuit",
    "date": "March 2, 2024"
  },
  ...
]
```

Each entry in the array represents a race with its name, circuit, and date.

## Project Structure

This project has been converted to use Next.js:

- `/pages` - Next.js pages including the main index page
- `/styles` - Global CSS styles
- `/public` - Static files including standings.json, f1-standings.json, and f1-calendar.json
- `/lib` - Utility functions including the standings scraper