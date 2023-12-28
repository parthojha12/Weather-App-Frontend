import React from "react";
import "./WeatherDetailsComponent.css";

const WeatherDetailsComponent = ({ city, weatherData }) => {
  if (!weatherData) {
    return <div>Add City to see Weather Forecast</div>;
  }

  const {
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    name,
  } = weatherData;

  return (
    <div className="container">
      <div className="weather-card">
        <strong>Feels Like:</strong> {feels_like}°C
      </div>
      <div className="weather-card">
        <strong>Min Temperature:</strong> {temp_min}°C
      </div>
      <div className="weather-card">
        <strong>Max Temperature:</strong> {temp_max}°C
      </div>
      <div className="weather-card">
        <strong>Pressure:</strong> {pressure} hPa
      </div>
      <div className="weather-card">
        <strong>Humidity:</strong> {humidity}%
      </div>
      <div className="weather-card">
        <strong>Wind Speed:</strong> {speed} m/s
      </div>
    </div>
  );
};

export default WeatherDetailsComponent;
