const axios = require('axios');
const { EnvironmentReading } = require('../models');

const apiKey = 'a8f8c2f62eb9f895b0aa72a27eca8fa7';
const city = 'Batangas';

async function fetchWeatherData() {
    try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: {
        q: city,
        appid: apiKey,
        units: 'metric'
        }
    });

    const { temp, humidity } = response.data.main;

    const reading = await EnvironmentReading.create({
        humidity,
        temperature: temp,
        researchCenterId: 'aabd0264-691e-4aac-8005-9e34bdfc7adb'
    });

    console.log('Environment reading saved:', reading);
    } catch (error) {
    console.error('Error fetching weather data:', error);
    }
}

module.exports = fetchWeatherData;
