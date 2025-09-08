// Sample weather data for demo purposes
const sampleWeatherData = {
    'nairobi': {
        location: 'Nairobi, Kenya',
        temperature: 22,
        feelsLike: 24,
        description: 'partly cloudy',
        humidity: 65,
        windSpeed: 12,
        pressure: 1013,
        icon: '⛅'
    },
    'london': {
        location: 'London, UK',
        temperature: 15,
        feelsLike: 13,
        description: 'light rain',
        humidity: 78,
        windSpeed: 8,
        pressure: 1008,
        icon: '🌧️'
    },
    'new york': {
        location: 'New York, USA',
        temperature: 18,
        feelsLike: 16,
        description: 'clear sky',
        humidity: 52,
        windSpeed: 15,
        pressure: 1015,
        icon: '☀️'
    },
    'tokyo': {
        location: 'Tokyo, Japan',
        temperature: 25,
        feelsLike: 27,
        description: 'scattered clouds',
        humidity: 70,
        windSpeed: 10,
        pressure: 1012,
        icon: '🌤️'
    },
    'paris': {
        location: 'Paris, France',
        temperature: 16,
        feelsLike: 14,
        description: 'overcast',
        humidity: 68,
        windSpeed: 7,
        pressure: 1010,
        icon: '☁️'
    },
    'sydney': {
        location: 'Sydney, Australia',
        temperature: 28,
        feelsLike: 31,
        description: 'sunny',
        humidity: 58,
        windSpeed: 18,
        pressure: 1018,
        icon: '☀️'
    }
};

function getCurrentDate() {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weatherInfo').style.display = 'none';
    document.getElementById('error').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

function showError(message) {
    const errorEl = document.getElementById('error');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    document.getElementById('weatherInfo').style.display = 'none';
}

function displayWeatherData(data) {
    document.getElementById('location').textContent = data.location;
    document.getElementById('date').textContent = getCurrentDate();
    document.getElementById('weatherIcon').textContent = data.icon;
    document.getElementById('temperature').textContent = `${data.temperature}°C`;
    document.getElementById('description').textContent = data.description;
    document.getElementById('feelsLike').textContent = `${data.feelsLike}°C`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.windSpeed} km/h`;
    document.getElementById('pressure').textContent = `${data.pressure} hPa`;
    
    document.getElementById('weatherInfo').style.display = 'block';
    document.getElementById('error').style.display = 'none';
}

function searchWeather() {
    const city = document.getElementById('cityInput').value.trim().toLowerCase();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    showLoading();

    // Simulate API call delay
    setTimeout(() => {
        hideLoading();
        
        const weatherData = sampleWeatherData[city];
        if (weatherData) {
            displayWeatherData(weatherData);
        } else {
            showError(`Weather data not found for "${city}". Try: Nairobi, London, New York, Tokyo, Paris, or Sydney`);
        }
    }, 1000);
}

// Allow Enter key to trigger search
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Load default city (Nairobi) on page load
window.addEventListener('load', function() {
    document.getElementById('cityInput').value = 'Nairobi';
    searchWeather();
});