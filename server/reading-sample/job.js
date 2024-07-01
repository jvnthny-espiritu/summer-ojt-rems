const cron = require('node-cron');
const fetchWeatherData = require('./fetch');

// Schedule the job to run every hour
cron.schedule('*/10 * * * *', () => {
  console.log('Fetching weather data...');
  fetchWeatherData();
});

console.log('Cron job started. Fetching weather data every 10 minutes.');
