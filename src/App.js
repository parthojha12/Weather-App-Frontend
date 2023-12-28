import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityInputComponent from './components/CityInputComponent';
import WeatherDetailsComponent from './components/WeatherDetailsComponent';
import WeatherForecast from './components/HourlyForecast';
import "./App.css";


const WeatherForecastApp = () => {
  const [cities, setCities] = useState([]);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const [showRecords, setShowRecords] = useState(false);
  const apiKey = "e2e806e1b480ea910f059ad02b483505"; 

  useEffect(() => {
    if (cities.length > 0) {
      const currentCity = cities[currentCityIndex];
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`)
        .then((response) => {
          console.log(response.data);
          setWeatherData(response.data)
        })
        .catch((error) => console.error('Error fetching weather data', error));
    }
  }, [cities, currentCityIndex, apiKey]);

  const handleAddCity = (city) => {
    setCities([...cities, city]);
    setCurrentCityIndex(cities.length);
  };
  console.log(cities)
  const handleNextCity = () => {
    setCurrentCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
  };

  const handlePrevCity = () => {
    setCurrentCityIndex((prevIndex) => (prevIndex - 1 + cities.length) % cities.length);
  };

  const handleToggleRecords = () => {
    setShowRecords((prevShowRecords) => !prevShowRecords);
  };

  return (
    <div>
      <div className="main-container">
        <div className="left-container">
          <CityInputComponent onAddCity={handleAddCity}/>
          <div className='city-change-btn'>
          <button className='btn'  onClick={handlePrevCity}>Back</button>
          <button className='btn' onClick={handleNextCity}>Next</button>
          </div> 
          {cities.length > 0 && weatherData && (
            <div className="city-info">
              <h2>{weatherData?.name},{weatherData?.sys?.country}</h2>
              <div className="temperature">{weatherData?.main?.temp}°C</div>
              <h2>{weatherData?.weather[0]?.main}</h2>
            </div>
          )}
            <img className='city-image' alt='city image' src={process.env.PUBLIC_URL + '/images/cityImage.jpg'} />
        </div>
        <div className="right-container">
          <h2>Welcome back Isabella!</h2>
          <h4>Check out Hourly Weather Forecast</h4>
          <WeatherForecast selectedCity={cities[currentCityIndex]} />
          <h4>More Details of today's weather</h4>
          <div className='weather-details-card'>
            <WeatherDetailsComponent city={cities[currentCityIndex]} weatherData={weatherData} /> 
          </div>
          <div className="show-records">
            <button className='btn-records' onClick={handleToggleRecords}><strong>Show Records</strong></button>
            {showRecords && (
              <div className='records-font' >
                <h4>Added Cities: {cities.map(city => city.charAt(0).toUpperCase() + city.slice(1)).join(', ')}</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherForecastApp;
