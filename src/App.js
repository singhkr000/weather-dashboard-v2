import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async (cityName) => {
    const searchCity = cityName || city;
    if (!searchCity) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
      );
      await res.json();
    } catch {
      // Handle error
    }
  };

  const themeStyles = {
    backgroundColor: darkMode ? "#0f0f0f" : "#e9f0f7",
    color: darkMode ? "#e9f0f7" : "#1a1a1a",
    fontFamily: "'Poppins', sans-serif",
    transition: "0.3s ease",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  };

  const containerStyle = {
    maxWidth: "720px",
    width: "100%",
    padding: "2rem",
    borderRadius: "16px",
    backgroundColor: darkMode ? "#1c1c1c" : "#ffffff",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  };

  const headingStyle = {
    fontWeight: "600",
    fontSize: "2.2rem",
    color: "#00bfff",
    textShadow: "0 0 10px rgba(0, 191, 255, 0.7), 0 0 20px rgba(0, 191, 255, 0.5)",
  };

  const inputStyle = {
    padding: "0.6rem",
    width: "220px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginRight: "10px",
  };

  const buttonStyle = {
    padding: "0.6rem",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    width: "45px",
    height: "45px",
    fontSize: "16px",
  };

  return (
    <div style={themeStyles}>
      <div style={containerStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={headingStyle}>🌤️ Weather Dashboard</h1>
          <button onClick={() => setDarkMode(!darkMode)} style={{ padding: "6px 12px", borderRadius: "8px" }}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div style={{ marginTop: "1.5rem", display: "flex", alignItems: "center" }}>
          <input
            type="text"
            value={city}
            placeholder="Enter city name"
            onChange={(e) => setCity(e.target.value)}
            style={inputStyle}
          />
          <button onClick={() => fetchWeather()} style={buttonStyle} title="Search">
            🔍
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
