// Weather App JavaScript
const API_KEY = 'your_openweathermap_api_key_here'; // Get from openweathermap.org
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Mock data for demo purposes
const mockWeatherData = {
    'nairobi': {
        name: 'Nairobi',
        sys: { country: 'KE' },
        main: {
            temp: 22,
            feels_like: 25,
            humidity: 65,
            pressure: 1013
        },
        weather: [
            {
                main: 'Clouds',
                description: 'partly cloudy',
                icon: '02d'
            }
        ],
        wind: { speed: 3.2 },
        visibility: 10000
    },
    'london': {
        name: 'London',
        sys: { country: 'GB' },
        main: {
            temp: 15,
            feels_like: 13,
            humidity: 78,
            pressure: 1015
        },
        weather: [
            {
                main: 'Rain',
                description: 'light rain',
                icon: '10d'
            }
        ],
        wind: { speed: 4.1 },
        visibility: 8000
    },
    'tokyo': {
        name: 'Tokyo',
        sys: { country: 'JP' },
        main: {
            temp: 28,
            feels_like: 32,
            humidity: 72,
            pressure: 1008
        },
        weather: [
            {
                main: 'Clear',
                description: 'clear sky',
                icon: '01d'
            }
        ],
        wind: { speed: 2.8 },
        visibility: 10000
    },
    'new york': {
        name: 'New York',
        sys: { country: 'US' },
        main: {
            temp: 18,
            feels_like: 16,
            humidity: 68,
            pressure: 1012
        },
        weather: [
            {
                main: 'Clouds',
                description: 'overcast clouds',
                icon: '04d'
            }
        ],
        wind: { speed: 5.2 },
        visibility: 9000
    }
};

// DOM Elements
const cityInput = document.getElementById('cityInput');
const defaultMessage = document.getElementById('defaultMessage');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const weatherInfo = document.getElementById('weatherInfo');

// Weather data elements
const cityName = document.getElementById('cityName');
const country = document.getElementById('country');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const visibility = document.getElementById('visibility');
const pressure = document.getElementById('pressure');
const uvIndex = document.getElementById('uvIndex');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchWeather();
        }
    });
    
    // Auto-focus search input
    cityInput.focus();
});

function searchWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    showLoading();
    hideError();
    hideDefault();
    hideWeatherInfo();
    
    // Simulate API call delay for better UX
    setTimeout(() => {
        getWeatherData(city);
    }, 1200);
}

async function getWeatherData(city) {
    try {
       
        const cityKey = city.toLowerCase();
        let data = mockWeatherData[cityKey];
        
        if (!data) {
          
            data = generateRandomWeather(city);
        }
        
        displayWeather(data);
        updateBackgroundTheme(data.weather[0].main);
        hideLoading();
        
    } catch (err) {
        console.error('Weather fetch error:', err);
        showError(err.message || 'Failed to fetch weather data. Please try again.');
        hideLoading();
    }
}

function generateRandomWeather(cityName) {
    const conditions = ['Clear', 'Clouds', 'Rain', 'Snow'];
    const descriptions = {
        'Clear': ['clear sky', 'sunny'],
        'Clouds': ['scattered clouds', 'overcast clouds', 'partly cloudy'],
        'Rain': ['light rain', 'moderate rain', 'drizzle'],
        'Snow': ['light snow', 'snow', 'heavy snow']
    };
    const icons = {
        'Clear': '01d',
        'Clouds': '03d',
        'Rain': '10d',
        'Snow': '13d'
    };
    
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const randomDescription = descriptions[randomCondition][
        Math.floor(Math.random() * descriptions[randomCondition].length)
    ];
    
    return {
        name: cityName,
        sys: { country: 'XX' },
        main: {
            temp: Math.round(Math.random() * 30 + 5), // 5-35°C
            feels_like: Math.round(Math.random() * 30 + 5),
            humidity: Math.round(Math.random() * 40 + 40), // 40-80%
            pressure: Math.round(Math.random() * 50 + 1000) // 1000-1050 hPa
        },
        weather: [{
            main: randomCondition,
            description: randomDescription,
            icon: icons[randomCondition]
        }],
        wind: {
            speed: Math.round(Math.random() * 10 + 1) // 1-11 km/h
        },
        visibility: Math.round(Math.random() * 5000 + 5000) // 5-10km
    };
}

function displayWeather(data) {
    // Update location
    cityName.textContent = data.name;
    country.textContent = data.sys.country;
    
    // Update main weather
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    
    // Update weather icon
    updateWeatherIcon(data.weather[0].main, data.weather[0].icon);
    
    // Update details
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    pressure.textContent = `${data.main.pressure} hPa`;
    uvIndex.textContent = Math.floor(Math.random() * 11); // Mock UV index
    
    showWeatherInfo();
}

function updateWeatherIcon(condition, iconCode) {
    let iconClass = '';
    
    switch (condition.toLowerCase()) {
        case 'clear':
            iconClass = iconCode.includes('n') ? 'fas fa-moon' : 'fas fa-sun';
            break;
        case 'clouds':
            iconClass = 'fas fa-cloud';
            break;
        case 'rain':
        case 'drizzle':
            iconClass = 'fas fa-cloud-rain';
            break;
        case 'snow':
            iconClass = 'fas fa-snowflake';
            break;
        case 'thunderstorm':
            iconClass = 'fas fa-bolt';
            break;
        case 'mist':
        case 'fog':
        case 'haze':
            iconClass = 'fas fa-smog';
            break;
        default:
            iconClass = 'fas fa-sun';
    }
    
    weatherIcon.innerHTML = `<i class="${iconClass}"></i>`;
}

function updateBackgroundTheme(condition) {
    const body = document.body;
    
    // Remove existing theme classes
    body.classList.remove('clear-day', 'clear-night', 'rain', 'snow', 'cloudy');
    
    // Add new theme class based on weather condition
    switch (condition.toLowerCase()) {
        case 'clear':
            body.classList.add('clear-day');
            break;
        case 'rain':
        case 'drizzle':
        case 'thunderstorm':
            body.classList.add('rain');
            break;
        case 'snow':
            body.classList.add('snow');
            break;
        case 'clouds':
        case 'mist':
        case 'fog':
        case 'haze':
            body.classList.add('cloudy');
            break;
    }
}

// UI State Management Functions
function showLoading() {
    loading.classList.add('active');
}

function hideLoading() {
    loading.classList.remove('active');
}

function showError(message) {
    error.querySelector('span').textContent = message;
    error.classList.add('active');
}

function hideError() {
    error.classList.remove('active');
}

function hideDefault() {
    defaultMessage.style.display = 'none';
}

function showDefault() {
    defaultMessage.style.display = 'block';
}

function showWeatherInfo() {
    weatherInfo.classList.add('active');
}

function hideWeatherInfo() {
    weatherInfo.classList.remove('active');
}

// Additional utility functions
function formatWindDirection(degrees) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

function getUVIndexColor(uvIndex) {
    if (uvIndex <= 2) return '#299501'; // Low - Green
    if (uvIndex <= 5) return '#f7d708'; // Moderate - Yellow
    if (uvIndex <= 7) return '#f85808'; // High - Orange
    if (uvIndex <= 10) return '#d8001d'; // Very High - Red
    return '#6b49c8'; // Extreme - Purple
}

// Add some interactive features
cityInput.addEventListener('input', function() {
    if (error.classList.contains('active')) {
        hideError();
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cityInput.blur();
    }
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        cityInput.focus();
        cityInput.select();
    }
});