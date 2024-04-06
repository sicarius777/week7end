const getWeatherData = async (city) => {
    const apiKey = '75c5fe145cd9991359551844b588e1b4';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};

const displayWeatherInfo = (weatherData) => {
    const weatherInfoContainer = document.getElementById('weatherInfo');
    weatherInfoContainer.innerHTML = '';

    if (!weatherData) {
        weatherInfoContainer.textContent = 'Error fetching weather data. Please try again.';
        return;
    }

    const { main, weather, name } = weatherData;
    const weatherCondition = weather[0].main;
    const temperature = main.temp;
    const humidity = main.humidity;

    const weatherInfoHTML = `
        <h2>${name}</h2>
        <p>Condition: ${weatherCondition}</p>
        <p>Temperature: ${temperature} K</p>
        <p>Humidity: ${humidity}%</p>
    `;

    weatherInfoContainer.innerHTML = weatherInfoHTML;
};

const getAndDisplayWeather = async () => {
    const city = document.getElementById('cityInput').value;
    const weatherData = await getWeatherData(city);
    displayWeatherInfo(weatherData);
};

document.getElementById('fetchWeatherBtn').addEventListener('click', getAndDisplayWeather);
