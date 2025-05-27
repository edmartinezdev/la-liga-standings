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
            tabButtons.forEach(btn => {
                btn.classList.remove('active-tab');
                btn.classList.add('text-gray-500', 'border-transparent');
                btn.classList.remove('text-blue-900', 'border-blue-900', 'bg-white');
            });
            
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });
            
            // Add active class to clicked button
            button.classList.add('active-tab', 'text-blue-900', 'border-blue-900', 'bg-white');
            button.classList.remove('text-gray-500', 'border-transparent');
            
            // Get the corresponding content id
            const contentId = button.id.replace('tab-', '') + '-content';
            document.getElementById(contentId).classList.remove('hidden');
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
                '<p class="text-red-500 text-center">Error loading standings data. Please try again later.</p>';
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
                '<p class="text-red-500 text-center">Error loading F1 drivers data. Please try again later.</p>';
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
                '<p class="text-red-500 text-center">Error loading F1 teams data. Please try again later.</p>';
        });
}

// Display La Liga standings
function displayStandings(data, elementId) {
    const standingsDiv = document.getElementById(elementId);
    
    // Create table element
    const table = document.createElement('table');
    table.className = 'min-w-full bg-white rounded-lg overflow-hidden';
    
    // Create table header
    const thead = document.createElement('thead');
    thead.className = 'bg-blue-900 text-white';
    const headerRow = document.createElement('tr');
    
    const headers = ['Pos', 'Team', 'Played', 'Points'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.className = 'px-4 py-3 text-left text-sm font-medium';
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    tbody.className = 'divide-y divide-gray-200';
    
    // Add data rows
    data.forEach((team, index) => {
        const row = document.createElement('tr');
        row.className = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
        row.classList.add('hover:bg-gray-100');
        
        const positionCell = document.createElement('td');
        positionCell.className = 'px-4 py-3 whitespace-nowrap text-sm text-gray-900';
        positionCell.textContent = team.position;
        row.appendChild(positionCell);
        
        const teamNameCell = document.createElement('td');
        teamNameCell.className = 'px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900';
        teamNameCell.textContent = team.team;
        row.appendChild(teamNameCell);
        
        const playedCell = document.createElement('td');
        playedCell.className = 'px-4 py-3 whitespace-nowrap text-sm text-gray-500';
        playedCell.textContent = team.played;
        row.appendChild(playedCell);
        
        const pointsCell = document.createElement('td');
        pointsCell.className = 'px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium';
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
    table.className = 'min-w-full bg-white rounded-lg overflow-hidden';
    
    // Create table header
    const thead = document.createElement('thead');
    thead.className = 'bg-blue-900 text-white';
    const headerRow = document.createElement('tr');
    
    const headers = ['Pos', 'Driver', 'Team', 'Points'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.className = 'px-4 py-3 text-left text-sm font-medium';
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    tbody.className = 'divide-y divide-gray-200';
    
    // Add data rows
    data.forEach((driver, index) => {
        const row = document.createElement('tr');
        row.className = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
        row.classList.add('hover:bg-gray-100');
        
        const positionCell = document.createElement('td');
        positionCell.className = 'px-4 py-3 whitespace-nowrap text-sm text-gray-900';
        positionCell.textContent = driver.position;
        row.appendChild(positionCell);
        
        const driverNameCell = document.createElement('td');
        driverNameCell.className = 'px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900';
        driverNameCell.textContent = driver.driver;
        row.appendChild(driverNameCell);
        
        const teamCell = document.createElement('td');
        teamCell.className = 'px-4 py-3 whitespace-nowrap text-sm text-gray-500';
        teamCell.textContent = driver.team;
        row.appendChild(teamCell);
        
        const pointsCell = document.createElement('td');
        pointsCell.className = 'px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium';
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
    table.className = 'min-w-full bg-white rounded-lg overflow-hidden';
    
    // Create table header
    const thead = document.createElement('thead');
    thead.className = 'bg-blue-900 text-white';
    const headerRow = document.createElement('tr');
    
    const headers = ['Pos', 'Team', 'Points'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.className = 'px-4 py-3 text-left text-sm font-medium';
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    tbody.className = 'divide-y divide-gray-200';
    
    // Add data rows
    data.forEach((team, index) => {
        const row = document.createElement('tr');
        row.className = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
        row.classList.add('hover:bg-gray-100');
        
        const positionCell = document.createElement('td');
        positionCell.className = 'px-4 py-3 whitespace-nowrap text-sm text-gray-900';
        positionCell.textContent = team.position;
        row.appendChild(positionCell);
        
        const teamNameCell = document.createElement('td');
        teamNameCell.className = 'px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900';
        teamNameCell.textContent = team.team;
        row.appendChild(teamNameCell);
        
        const pointsCell = document.createElement('td');
        pointsCell.className = 'px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium';
        pointsCell.textContent = team.points;
        row.appendChild(pointsCell);
        
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    
    // Clear loading message and append table
    standingsDiv.innerHTML = '';
    standingsDiv.appendChild(table);
}