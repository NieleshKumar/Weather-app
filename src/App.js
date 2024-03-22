import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b6e862a3db558380e75f429686129cdd`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Forecast</button>
      </form>
      {weatherData && (
        <div>
          <h2>{weatherData.city.name} Weather Forecast</h2>
          <ul>
            {weatherData.list.map((item, index) => (
              <li key={index}>
                Date: {item.dt_txt}, Temperature: {item.main.temp}°C
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
