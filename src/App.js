import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        setError("City not found.");
      }
    } catch (err) {
      setWeather(null);
      setError("Failed to fetch weather data.");
    }

    setLoading(false);
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
          <button onClick={fetchWeather} style={buttonStyle}>
            Search
          </button>
        </div>

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
      </div>
    </div>
  );
}

export default App;
