document.addEventListener('DOMContentLoaded', function() {
    // Set the current date as the last update time
    const now = new Date();
    document.getElementById('last-update').textContent = now.toLocaleDateString();
    
    // Setup tab navigation
    setupTabs();
    
    // Fetch and display initial data
    fetchLaLigaData();
    fetchF1DriversData();
    fetchF1TeamsData();
});

// Tab navigation functionality
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the corresponding content id
            const contentId = button.id.replace('tab-', '') + '-content';
            document.getElementById(contentId).classList.add('active');
        });
    });
}

// Fetch La Liga data
function fetchLaLigaData() {
    fetch('standings.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayStandings(data, 'standings');
        })
        .catch(error => {
            console.error('Error fetching standings data:', error);
            document.getElementById('standings').innerHTML = 
                '<p style="color: red; text-align: center;">Error loading standings data. Please try again later.</p>';
        });
}

// Fetch F1 drivers data
function fetchF1DriversData() {
    fetch('f1-drivers.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayF1DriversStandings(data);
        })
        .catch(error => {
            console.error('Error fetching F1 drivers data:', error);
            document.getElementById('f1-drivers-standings').innerHTML = 
                '<p style="color: red; text-align: center;">Error loading F1 drivers data. Please try again later.</p>';
        });
}

// Fetch F1 teams data
function fetchF1TeamsData() {
    fetch('f1-teams.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayF1TeamsStandings(data);
        })
        .catch(error => {
            console.error('Error fetching F1 teams data:', error);
            document.getElementById('f1-teams-standings').innerHTML = 
                '<p style="color: red; text-align: center;">Error loading F1 teams data. Please try again later.</p>';
        });
}

// Display La Liga standings
function displayStandings(data, elementId) {
    const standingsDiv = document.getElementById(elementId);
    
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

// Display F1 drivers standings
function displayF1DriversStandings(data) {
    const standingsDiv = document.getElementById('f1-drivers-standings');
    
    // Create table element
    const table = document.createElement('table');
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = ['Pos', 'Driver', 'Team', 'Points'];
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
    data.forEach(driver => {
        const row = document.createElement('tr');
        
        const positionCell = document.createElement('td');
        positionCell.textContent = driver.position;
        row.appendChild(positionCell);
        
        const driverNameCell = document.createElement('td');
        driverNameCell.textContent = driver.driver;
        row.appendChild(driverNameCell);
        
        const teamCell = document.createElement('td');
        teamCell.textContent = driver.team;
        row.appendChild(teamCell);
        
        const pointsCell = document.createElement('td');
        pointsCell.textContent = driver.points;
        row.appendChild(pointsCell);
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    
    // Clear loading message and append table
    standingsDiv.innerHTML = '';
    standingsDiv.appendChild(table);
}

// Display F1 teams standings
function displayF1TeamsStandings(data) {
    const standingsDiv = document.getElementById('f1-teams-standings');
    
    // Create table element
    const table = document.createElement('table');
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    const headers = ['Pos', 'Team', 'Points'];
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