import React, { useEffect, useState } from 'react';
import { Thermometer, Wind } from 'react-feather';

const WeatherWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [locationError, setLocationError] = useState(false);

  const fetchWeatherData = async (lat, lon) => {
    const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY; 
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setTemperature(data.main.temp);
      setWindSpeed(data.wind.speed);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError(true);
        }
      );
    } else {
      setLocationError(true);
    }
  };

  useEffect(() => {
    getLocation();
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update time every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-xl p-5 shadow-2xl flex items-center justify-between w-full max-w-lg transition-all duration-500 ease-in-out">
      <div className="text-center">
        <div className="text-2xl font-extrabold text-gray-800 animate-fadeIn">
          {currentTime.toLocaleDateString('en-US', { weekday: 'long' })}
        </div>
        <div className="text-lg text-gray-600 animate-fadeIn">
          {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
      <div className="flex items-center space-x-6">
        {temperature !== null && windSpeed !== null ? (
          <>
            <div className="flex items-center">
              <Thermometer size={28} className="text-red-600 animate-pulse mr-2 transition-transform duration-300 hover:scale-110" />
              <span className="text-red-900 font-semibold text-lg">{temperature}°C</span>
            </div>
            <div className="flex items-center">
              <Wind size={28} className="text-blue-600 animate-spin-slow mr-2 transition-transform duration-300 hover:scale-110" />
              <span className="text-blue-900 font-semibold text-lg">{windSpeed} km/h</span>
            </div>
          </>
        ) : (
          <div className="text-gray-500">
            {locationError ? 'Unable to fetch location' : 'Fetching weather data...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
