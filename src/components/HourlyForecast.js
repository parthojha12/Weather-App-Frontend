import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./HourlyForecast.css";

const WeatherForecast = ({ selectedCity }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "e2e806e1b480ea910f059ad02b483505";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchData();
  }, [selectedCity]);

  useEffect(() => {
    console.log("Selected City:", selectedCity);
    console.log("Weather Data:", weatherData);
  }, [selectedCity, weatherData]);

  if (!weatherData) {
    return <div>Add City to see hourly forecast</div>;
  }
  const forecastData = weatherData.list.slice(0, 8);

  return (
    <div className="container mt-5">
      <div className="horizontal-scroll">
        {forecastData.map((forecast, index) => (
          <div key={index} className="card mr-3">
            <div className="card-body">
              <h5 className="card-title">
                {format(new Date(forecast.dt * 1000), "yyyy-MM-dd")}
              </h5>
              <h5 className="card-title">{forecast.dt_txt.split(" ")[1]}</h5>
              <p className="card-text">{forecast.main.temp} °C</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
