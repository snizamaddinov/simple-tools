const ipEl = document.getElementById('ipAddress');
const cityEl = document.getElementById('city');
const regionEl = document.getElementById('region');
const countryEl = document.getElementById('country');
const ispEl = document.getElementById('isp');
const coordsEl = document.getElementById('coords');
const mapsLink = document.getElementById('mapsLink');

const refreshBtn = document.getElementById('refreshBtn');
const copyIpBtn = document.getElementById('copyIpBtn');

async function fetchIpData() {
    // Reset UI to loading state
    ipEl.innerText = 'Loading...';
    ipEl.classList.add('loading');
    
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        // Update IP
        ipEl.innerText = data.ip;
        ipEl.classList.remove('loading');

        // Update Details
        cityEl.innerText = data.city || 'N/A';
        regionEl.innerText = data.region || 'N/A';
        countryEl.innerText = data.country_name || 'N/A';
        ispEl.innerText = data.org || 'N/A';
        
        // Coordinates and Map Link
        if (data.latitude && data.longitude) {
            const coords = `${data.latitude}, ${data.longitude}`;
            coordsEl.innerText = coords;
            mapsLink.href = `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`;
            mapsLink.style.display = 'inline-block';
        } else {
            coordsEl.innerText = 'N/A';
            mapsLink.style.display = 'none';
        }

    } catch (error) {
        console.error('Error fetching IP data:', error);
        ipEl.innerText = 'Error';
        cityEl.innerText = 'Failed to load data';
    }
}

// Copy IP Functionality
copyIpBtn.addEventListener('click', () => {
    const ipText = ipEl.innerText;
    if (ipText === 'Loading...' || ipText === 'Error') return;

    navigator.clipboard.writeText(ipText).then(() => {
        const originalText = copyIpBtn.innerText;
        copyIpBtn.innerText = 'Copied!';
        copyIpBtn.style.backgroundColor = '#66afe9';
        copyIpBtn.style.color = '#1e1e1e';
        
        setTimeout(() => {
            copyIpBtn.innerText = originalText;
            copyIpBtn.style.backgroundColor = ''; // Reverts to CSS default
            copyIpBtn.style.color = '';
        }, 1500);
    });
});

refreshBtn.addEventListener('click', fetchIpData);

// Fetch on load
fetchIpData();
