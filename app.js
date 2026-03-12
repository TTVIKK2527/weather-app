const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';
const HISTORICAL_URL = 'https://archive-api.open-meteo.com/v1/archive';

// Country code to name mapping for territories without full country names
const COUNTRY_NAMES = {
    'AD': 'Andorra', 'AE': 'United Arab Emirates', 'AF': 'Afghanistan', 'AG': 'Antigua and Barbuda',
    'AI': 'Anguilla', 'AL': 'Albania', 'AM': 'Armenia', 'AO': 'Angola', 'AQ': 'Antarctica',
    'AR': 'Argentina', 'AS': 'American Samoa', 'AT': 'Austria', 'AU': 'Australia', 'AW': 'Aruba',
    'AX': 'Åland Islands', 'AZ': 'Azerbaijan', 'BA': 'Bosnia and Herzegovina', 'BB': 'Barbados',
    'BD': 'Bangladesh', 'BE': 'Belgium', 'BF': 'Burkina Faso', 'BG': 'Bulgaria', 'BH': 'Bahrain',
    'BI': 'Burundi', 'BJ': 'Benin', 'BL': 'Saint Barthélemy', 'BM': 'Bermuda', 'BN': 'Brunei',
    'BO': 'Bolivia', 'BQ': 'Caribbean Netherlands', 'BR': 'Brazil', 'BS': 'Bahamas', 'BT': 'Bhutan',
    'BV': 'Bouvet Island', 'BW': 'Botswana', 'BY': 'Belarus', 'BZ': 'Belize', 'CA': 'Canada',
    'CC': 'Cocos Islands', 'CD': 'DR Congo', 'CF': 'Central African Republic', 'CG': 'Congo',
    'CH': 'Switzerland', 'CI': 'Côte d\'Ivoire', 'CK': 'Cook Islands', 'CL': 'Chile', 'CM': 'Cameroon',
    'CN': 'China', 'CO': 'Colombia', 'CR': 'Costa Rica', 'CU': 'Cuba', 'CV': 'Cape Verde',
    'CW': 'Curaçao', 'CX': 'Christmas Island', 'CY': 'Cyprus', 'CZ': 'Czechia', 'DE': 'Germany',
    'DJ': 'Djibouti', 'DK': 'Denmark', 'DM': 'Dominica', 'DO': 'Dominican Republic', 'DZ': 'Algeria',
    'EC': 'Ecuador', 'EE': 'Estonia', 'EG': 'Egypt', 'EH': 'Western Sahara', 'ER': 'Eritrea',
    'ES': 'Spain', 'ET': 'Ethiopia', 'FI': 'Finland', 'FJ': 'Fiji', 'FK': 'Falkland Islands',
    'FM': 'Micronesia', 'FO': 'Faroe Islands', 'FR': 'France', 'GA': 'Gabon', 'GB': 'United Kingdom',
    'GD': 'Grenada', 'GE': 'Georgia', 'GF': 'French Guiana', 'GG': 'Guernsey', 'GH': 'Ghana',
    'GI': 'Gibraltar', 'GL': 'Greenland', 'GM': 'Gambia', 'GN': 'Guinea', 'GP': 'Guadeloupe',
    'GQ': 'Equatorial Guinea', 'GR': 'Greece', 'GS': 'South Georgia', 'GT': 'Guatemala', 'GU': 'Guam',
    'GW': 'Guinea-Bissau', 'GY': 'Guyana', 'HK': 'Hong Kong', 'HM': 'Heard Island', 'HN': 'Honduras',
    'HR': 'Croatia', 'HT': 'Haiti', 'HU': 'Hungary', 'ID': 'Indonesia', 'IE': 'Ireland', 'IL': 'Israel',
    'IM': 'Isle of Man', 'IN': 'India', 'IO': 'British Indian Ocean Territory', 'IQ': 'Iraq',
    'IR': 'Iran', 'IS': 'Iceland', 'IT': 'Italy', 'JE': 'Jersey', 'JM': 'Jamaica', 'JO': 'Jordan',
    'JP': 'Japan', 'KE': 'Kenya', 'KG': 'Kyrgyzstan', 'KH': 'Cambodia', 'KI': 'Kiribati',
    'KM': 'Comoros', 'KN': 'Saint Kitts and Nevis', 'KP': 'North Korea', 'KR': 'South Korea',
    'KW': 'Kuwait', 'KY': 'Cayman Islands', 'KZ': 'Kazakhstan', 'LA': 'Laos', 'LB': 'Lebanon',
    'LC': 'Saint Lucia', 'LI': 'Liechtenstein', 'LK': 'Sri Lanka', 'LR': 'Liberia', 'LS': 'Lesotho',
    'LT': 'Lithuania', 'LU': 'Luxembourg', 'LV': 'Latvia', 'LY': 'Libya', 'MA': 'Morocco',
    'MC': 'Monaco', 'MD': 'Moldova', 'ME': 'Montenegro', 'MF': 'Saint Martin', 'MG': 'Madagascar',
    'MH': 'Marshall Islands', 'MK': 'North Macedonia', 'ML': 'Mali', 'MM': 'Myanmar', 'MN': 'Mongolia',
    'MO': 'Macau', 'MP': 'Northern Mariana Islands', 'MQ': 'Martinique', 'MR': 'Mauritania',
    'MS': 'Montserrat', 'MT': 'Malta', 'MU': 'Mauritius', 'MV': 'Maldives', 'MW': 'Malawi',
    'MX': 'Mexico', 'MY': 'Malaysia', 'MZ': 'Mozambique', 'NA': 'Namibia', 'NC': 'New Caledonia',
    'NE': 'Niger', 'NF': 'Norfolk Island', 'NG': 'Nigeria', 'NI': 'Nicaragua', 'NL': 'Netherlands',
    'NO': 'Norway', 'NP': 'Nepal', 'NR': 'Nauru', 'NU': 'Niue', 'NZ': 'New Zealand', 'OM': 'Oman',
    'PA': 'Panama', 'PE': 'Peru', 'PF': 'French Polynesia', 'PG': 'Papua New Guinea', 'PH': 'Philippines',
    'PK': 'Pakistan', 'PL': 'Poland', 'PM': 'Saint Pierre and Miquelon', 'PN': 'Pitcairn Islands',
    'PR': 'Puerto Rico', 'PS': 'Palestine', 'PT': 'Portugal', 'PW': 'Palau', 'PY': 'Paraguay',
    'QA': 'Qatar', 'RE': 'Réunion', 'RO': 'Romania', 'RS': 'Serbia', 'RU': 'Russia', 'RW': 'Rwanda',
    'SA': 'Saudi Arabia', 'SB': 'Solomon Islands', 'SC': 'Seychelles', 'SD': 'Sudan', 'SE': 'Sweden',
    'SG': 'Singapore', 'SH': 'Saint Helena', 'SI': 'Slovenia', 'SJ': 'Svalbard and Jan Mayen',
    'SK': 'Slovakia', 'SL': 'Sierra Leone', 'SM': 'San Marino', 'SN': 'Senegal', 'SO': 'Somalia',
    'SR': 'Suriname', 'SS': 'South Sudan', 'ST': 'São Tomé and Príncipe', 'SV': 'El Salvador',
    'SX': 'Sint Maarten', 'SY': 'Syria', 'SZ': 'Eswatini', 'TC': 'Turks and Caicos Islands',
    'TD': 'Chad', 'TF': 'French Southern Territories', 'TG': 'Togo', 'TH': 'Thailand', 'TJ': 'Tajikistan',
    'TK': 'Tokelau', 'TL': 'Timor-Leste', 'TM': 'Turkmenistan', 'TN': 'Tunisia', 'TO': 'Tonga',
    'TR': 'Turkey', 'TT': 'Trinidad and Tobago', 'TV': 'Tuvalu', 'TW': 'Taiwan', 'TZ': 'Tanzania',
    'UA': 'Ukraine', 'UG': 'Uganda', 'UM': 'U.S. Minor Outlying Islands', 'US': 'United States',
    'UY': 'Uruguay', 'UZ': 'Uzbekistan', 'VA': 'Vatican City', 'VC': 'Saint Vincent and the Grenadines',
    'VE': 'Venezuela', 'VG': 'British Virgin Islands', 'VI': 'U.S. Virgin Islands', 'VN': 'Vietnam',
    'VU': 'Vanuatu', 'WF': 'Wallis and Futuna', 'WS': 'Samoa', 'XK': 'Kosovo', 'YE': 'Yemen',
    'YT': 'Mayotte', 'ZA': 'South Africa', 'ZM': 'Zambia', 'ZW': 'Zimbabwe'
};

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
        currentCity = locationName;
        locationInfo.innerHTML = `<strong>📍 ${locationName}</strong>${country ? '<br><small>' + country + '</small>' : ''}`;
        
        const isHistorical = new Date(selectedDate) < new Date(today);
        const apiUrl = isHistorical ? HISTORICAL_URL : WEATHER_URL;
        
        const params = `latitude=${lat}&longitude=${lon}&start_date=${selectedDate}&end_date=${selectedDate}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max,winddirection_10m_dominant&temperature_unit=celsius&windspeed_unit=kmh&timezone=auto`;
        
        const weatherResponse = await fetch(`${apiUrl}?${params}`);
        const weatherData = await weatherResponse.json();
        
        const location = {
            name: locationName,
            country: country || 'Unknown'
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

        // If multiple results, show disambiguation
        if (geoData.results.length > 1) {
            showDisambiguation(geoData.results, selectedDate);
            return;
        }

        const location = geoData.results[0];
        fetchWeatherForLocation(location, selectedDate);
    } catch (error) {
        showError(error.message);
    }
}

function showDisambiguation(results, selectedDate) {
    const uniqueResults = results
        .filter((loc, index, self) => 
            index === self.findIndex(l => l.name === loc.name && l.country === loc.country)
        )
        .slice(0, 8);
    
    if (uniqueResults.length === 1) {
        fetchWeatherForLocation(uniqueResults[0], selectedDate);
        return;
    }
    
    const options = uniqueResults.map(loc => {
        // Handle undefined, null, or string "undefined" for admin1 and country
        const hasAdmin = loc.admin1 && loc.admin1 !== 'undefined' && loc.admin1.trim() !== '';
        const admin = hasAdmin ? `, ${loc.admin1}` : '';
        
        // Use country name if available, otherwise look up country_code
        let countryName = loc.country;
        if (!countryName || countryName === 'undefined' || countryName.trim() === '') {
            countryName = COUNTRY_NAMES[loc.country_code] || loc.country_code || '';
        }
        const country = countryName ? `, ${countryName}` : '';
        
        const pop = loc.population ? ` (${(loc.population / 1000).toFixed(0)}k)` : '';
        return `<div class="location-option" data-lat="${loc.latitude}" data-lon="${loc.longitude}" data-name="${loc.name}" data-country="${countryName}">
            📍 ${loc.name}${admin}${country}${pop}
        </div>`;
    }).join('');
    
    weatherDiv.innerHTML = `
        <div class="disambiguation">
            <h3>Multiple locations found. Please select:</h3>
            <div class="location-options">
                ${options}
            </div>
        </div>
    `;
    
    document.querySelectorAll('.location-option').forEach(option => {
        option.addEventListener('click', () => {
            const location = {
                latitude: option.dataset.lat,
                longitude: option.dataset.lon,
                name: option.dataset.name,
                country: option.dataset.country
            };
            cityInput.value = `${location.name}, ${location.country}`;
            currentCity = cityInput.value;
            fetchWeatherForLocation(location, selectedDate);
        });
    });
}

function fetchWeatherForLocation(location, selectedDate) {
    const isHistorical = new Date(selectedDate) < new Date(today);
    const apiUrl = isHistorical ? HISTORICAL_URL : WEATHER_URL;
    
    const params = `latitude=${location.latitude}&longitude=${location.longitude}&start_date=${selectedDate}&end_date=${selectedDate}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max,winddirection_10m_dominant&temperature_unit=celsius&windspeed_unit=kmh&timezone=auto`;
    
    fetch(`${apiUrl}?${params}`)
        .then(response => response.json())
        .then(weatherData => {
            currentCity = cityInput.value;
            displayWeather(location, weatherData.daily, selectedDate);
        })
        .catch(error => showError(error.message));
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
    
    // Handle undefined, null, or string "undefined" for country
    const country = location.country && location.country !== 'undefined' && location.country.trim() !== '' 
        ? location.country 
        : '';
    const countryDisplay = country ? `, ${country}` : '';
    
    weatherDiv.innerHTML = `
        <h2>${location.name}${countryDisplay}</h2>
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
