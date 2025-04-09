import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async (cityName) => {
    const searchCity = cityName || city;
    if (!searchCity) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
        setRecentSearches((prev) => {
          const updated = [searchCity, ...prev.filter((c) => c.toLowerCase() !== searchCity.toLowerCase())];
          return updated.slice(0, 5);
        });
        await fetchForecast(searchCity);
      } else {
        setWeather(null);
        setForecast([]);
        setError("City not found.");
      }
    } catch (err) {
      setWeather(null);
      setForecast([]);
      setError("Failed to fetch weather data.");
    }

    setLoading(false);
  };

  const fetchForecast = async (searchCity) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    const daily = data.list.filter((item) => item.dt_txt.includes("12:00:00"));
    setForecast(daily);
  };

  const refreshWeather = () => {
    if (weather && weather.name) {
      fetchWeather(weather.name);
    }
  };

  const themeStyles = {
    backgroundColor: darkMode ? "#121212" : "#f4f4f4",
    color: darkMode ? "#f4f4f4" : "#121212",
    fontFamily: "'Poppins', sans-serif",
    transition: "0.3s ease",
    minHeight: "100vh",
    padding: "2rem",
  };

  const containerStyle = {
    maxWidth: "600px",
    margin: "auto",
    background: darkMode ? "#1e1e1e" : "#ffffff",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  };

  const inputStyle = {
    padding: "0.6rem",
    width: "70%",
    marginRight: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={themeStyles}>
      <div style={containerStyle}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>🌤️ Weather Dashboard</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ padding: "6px 10px", borderRadius: "6px" }}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={inputStyle}
          />
          <button onClick={() => fetchWeather()} style={buttonStyle}>
            Search
          </button>
          {weather && (
            <button
              onClick={refreshWeather}
              style={{ ...buttonStyle, marginLeft: "10px", backgroundColor: "#28a745" }}
            >
              🔄 Refresh
            </button>
          )}
        </div>

        {recentSearches.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <h4>Recent Searches:</h4>
            {recentSearches.map((c, index) => (
              <button
                key={index}
                onClick={() => fetchWeather(c)}
                style={{
                  margin: "5px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid #888",
                  cursor: "pointer",
                  background: darkMode ? "#444" : "#eaeaea",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {weather && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>🌡 Temp: {weather.main.temp} °C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬 Wind: {weather.wind.speed} km/h</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
          </div>
        )}

        {forecast.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h3>5-Day Forecast</h3>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
              {forecast.map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: darkMode ? "#333" : "#f0f0f0",
                    padding: "1rem",
                    borderRadius: "10px",
                    width: "120px",
                    textAlign: "center",
                  }}
                >
                  <strong>{new Date(item.dt_txt).toLocaleDateString()}</strong>
                  <p>{item.weather[0].main}</p>
                  <p>{item.main.temp}°C</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt={item.weather[0].description}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
