document.addEventListener('DOMContentLoaded', function() {
    // Set the current date as the last update time
    const now = new Date();
    document.getElementById('last-update').textContent = now.toLocaleDateString();
    
    // Fetch the standings data from standings.json
    fetch('standings.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayStandings(data);
        })
        .catch(error => {
            console.error('Error fetching standings data:', error);
            document.getElementById('standings').innerHTML = 
                '<p style="color: red; text-align: center;">Error loading standings data. Please try again later.</p>';
        });
});

function displayStandings(data) {
    const standingsDiv = document.getElementById('standings');
    
    // Create table element
    const table = document.createElement('table');
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = ['Pos', 'Team', 'Played', 'Points'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Add data rows
    data.forEach(team => {
        const row = document.createElement('tr');
        
        const positionCell = document.createElement('td');
        positionCell.textContent = team.position;
        row.appendChild(positionCell);
        
        const teamNameCell = document.createElement('td');
        teamNameCell.textContent = team.team;
        row.appendChild(teamNameCell);
        
        const playedCell = document.createElement('td');
        playedCell.textContent = team.played;
        row.appendChild(playedCell);
        
        const pointsCell = document.createElement('td');
        pointsCell.textContent = team.points;
        row.appendChild(pointsCell);
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    
    // Clear loading message and append table
    standingsDiv.innerHTML = '';
    standingsDiv.appendChild(table);
}