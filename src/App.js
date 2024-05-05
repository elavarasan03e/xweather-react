import React, { useState } from 'react';
import './App.css'

const API_KEY = '3aa33606e9d74c7399f105847240505';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      alert('Failed to fetch weather data');
    }
    setLoading(false);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading data...</p>}
      <div className="weather-cards">
        {weatherData && (
          <><div className="weather-card">
            <h2>Temperature</h2>
            <p>{weatherData.current.temp_c}°C</p>
          </div><div className="weather-card">
              <h2>Humidity</h2>
              <p>{weatherData.current.humidity}%</p>
            </div><div className="weather-card">
              <h2>Condition</h2>
              <p>{weatherData.current.condition.text}</p>
            </div><div className="weather-card">
              <h2>Wind Speed</h2>
              <p>{weatherData.current.wind_kph} km/h</p>
            </div></>
        )}
      </div>
    </div>
  );
}

export default App;
