const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';
const HISTORICAL_URL = 'https://archive-api.open-meteo.com/v1/archive';

const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('search');
const locateBtn = document.getElementById('locate');
const weatherDiv = document.getElementById('weather');
const dateInput = document.getElementById('date');
const locationInfo = document.getElementById('location-info');

const today = new Date().toISOString().split('T')[0];
dateInput.value = today;
dateInput.max = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

searchBtn.addEventListener('click', getWeather);
locateBtn.addEventListener('click', getUserLocation);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});
dateInput.addEventListener('change', () => {
    if (cityInput.value.trim()) getWeather();
});

getUserLocation();

async function getUserLocation() {
    if (!navigator.geolocation) {
        locationInfo.textContent = 'Geolocation not supported';
        return;
    }

    locateBtn.disabled = true;
    locateBtn.textContent = '⌛ Detecting...';
    locationInfo.textContent = 'Detecting your location...';

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                await getWeatherByCoords(position.coords.latitude, position.coords.longitude);
            } catch (error) {
                locationInfo.textContent = 'Location detection failed';
                showError(error.message);
            } finally {
                locateBtn.disabled = false;
                locateBtn.textContent = '🔄 Refresh Location';
            }
        },
        (error) => {
            locationInfo.textContent = 'Location access denied';
            showError('Location access denied');
            locateBtn.disabled = false;
            locateBtn.textContent = '🔄 Refresh Location';
        }
    );
}

async function getWeatherByCoords(lat, lon) {
    const selectedDate = dateInput.value;
    
    try {
        const reverseGeoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
        const reverseGeoResponse = await fetch(reverseGeoUrl);
        const reverseGeoData = await reverseGeoResponse.json();
        
        const locationName = reverseGeoData.city || reverseGeoData.locality || reverseGeoData.principalSubdivision || 'Unknown Location';
        const country = reverseGeoData.countryName || '';
        
        cityInput.value = locationName;
        locationInfo.innerHTML = `<strong>📍 ${locationName}</strong>${country ? '<br><small>' + country + '</small>' : ''}`;
        
        const isHistorical = new Date(selectedDate) < new Date(today);
        const apiUrl = isHistorical ? HISTORICAL_URL : WEATHER_URL;
        
        const params = `latitude=${lat}&longitude=${lon}&start_date=${selectedDate}&end_date=${selectedDate}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max,winddirection_10m_dominant&temperature_unit=celsius&windspeed_unit=kmh&timezone=auto`;
        
        const weatherResponse = await fetch(`${apiUrl}?${params}`);
        const weatherData = await weatherResponse.json();
        
        const location = {
            name: locationName,
            country: country
        };
        
        displayWeather(location, weatherData.daily, selectedDate);
    } catch (error) {
        throw error;
    }
}

async function getWeather() {
    const city = cityInput.value.trim();
    const selectedDate = dateInput.value;
    
    if (!city) {
        showError('Enter a city name');
        return;
    }

    try {
        const encodedCity = encodeURIComponent(city);
        const geoResponse = await fetch(`${GEOCODING_URL}?name=${encodedCity}&count=10&language=en&format=json`);
        const geoData = await geoResponse.json();
        
        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('City not found');
        }

        // Sort by population (largest cities first) to get most relevant result
        const sortedResults = geoData.results.sort((a, b) => {
            const popA = a.population || 0;
            const popB = b.population || 0;
            return popB - popA;
        });
        
        const location = sortedResults[0];
        const isHistorical = new Date(selectedDate) < new Date(today);
        const apiUrl = isHistorical ? HISTORICAL_URL : WEATHER_URL;
        
        const params = `latitude=${location.latitude}&longitude=${location.longitude}&start_date=${selectedDate}&end_date=${selectedDate}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max,winddirection_10m_dominant&temperature_unit=celsius&windspeed_unit=kmh&timezone=auto`;
        
        const weatherResponse = await fetch(`${apiUrl}?${params}`);
        const weatherData = await weatherResponse.json();
        
        displayWeather(location, weatherData.daily, selectedDate);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(location, weather, selectedDate) {
    const tempMax = Math.round(weather.temperature_2m_max[0]);
    const tempMin = Math.round(weather.temperature_2m_min[0]);
    const windSpeed = Math.round(weather.windspeed_10m_max[0]);
    const windDir = weather.winddirection_10m_dominant[0];
    const date = new Date(selectedDate);
    const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    const isToday = selectedDate === today;
    
    const weatherData = {
        0: { desc: 'Clear sky', icon: '☀️' },
        1: { desc: 'Mainly clear', icon: '🌤️' },
        2: { desc: 'Partly cloudy', icon: '⛅' },
        3: { desc: 'Overcast', icon: '☁️' },
        45: { desc: 'Foggy', icon: '🌫️' },
        48: { desc: 'Foggy', icon: '🌫️' },
        51: { desc: 'Light drizzle', icon: '🌦️' },
        53: { desc: 'Drizzle', icon: '🌧️' },
        55: { desc: 'Heavy drizzle', icon: '🌧️' },
        61: { desc: 'Light rain', icon: '🌧️' },
        63: { desc: 'Rain', icon: '🌧️' },
        65: { desc: 'Heavy rain', icon: '⛈️' },
        71: { desc: 'Light snow', icon: '🌨️' },
        73: { desc: 'Snow', icon: '❄️' },
        75: { desc: 'Heavy snow', icon: '❄️' },
        77: { desc: 'Snow grains', icon: '❄️' },
        80: { desc: 'Light showers', icon: '🌦️' },
        81: { desc: 'Showers', icon: '🌧️' },
        82: { desc: 'Heavy showers', icon: '⛈️' },
        85: { desc: 'Light snow showers', icon: '🌨️' },
        86: { desc: 'Snow showers', icon: '🌨️' },
        95: { desc: 'Thunderstorm', icon: '⛈️' },
        96: { desc: 'Thunderstorm with hail', icon: '⛈️' },
        99: { desc: 'Heavy thunderstorm', icon: '⛈️' }
    };
    
    const weatherInfo = weatherData[weather.weathercode[0]] || { desc: 'Unknown', icon: '🌍' };
    const windArrow = getWindArrow(windDir);
    
    weatherDiv.innerHTML = `
        <h2>${location.name}, ${location.country}</h2>
        <div class="date-time">${dateStr}${isToday ? ' (Today)' : ''}</div>
        <div class="main-temp">
            <span class="icon">${weatherInfo.icon}</span>
            <div class="temp-range">
                <span class="temp-high">${tempMax}°C</span>
                <span class="temp-low">${tempMin}°C</span>
            </div>
        </div>
        <div class="weather-info">
            <div><strong>Condition:</strong> ${weatherInfo.desc}</div>
            <div><strong>Wind:</strong> ${windArrow} ${windSpeed} km/h</div>
        </div>
    `;
}

function getWindArrow(degrees) {
    const arrows = ['↓', '↙', '←', '↖', '↑', '↗', '→', '↘'];
    const index = Math.round(degrees / 45) % 8;
    return arrows[index];
}

function showError(message) {
    weatherDiv.innerHTML = `<div class="error">${message}</div>`;
}
