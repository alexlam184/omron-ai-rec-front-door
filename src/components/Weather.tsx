'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherData {
  city: string;
  temperature: string;
  feelsLike: string;
  description: string;
  windSpeed: string;
  humidity: string;
  sunrise: string;
  sunset: string;
}

interface WeatherProps {
  style?: React.CSSProperties;
}

const Weather: React.FC<WeatherProps> = ({ style }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const API_KEY = '9fd5335b9f3a19e8626718818862e335';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  useEffect(() => {
    const fetchWeather = async (city: string = 'Tsim Sha Tsui,HK') => {
      try {
        const response = await axios.get(
          `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );

        const res = response.data;

        setWeather({
          city: res.name || 'Unknown city',
          temperature: res.main?.temp
            ? `${res.main.temp}`
            : 'Temperature data not available',
          feelsLike: res.main?.feels_like
            ? `${res.main.feels_like}`
            : 'Feels-like temperature not available',
          description:
            res.weather?.[0]?.description || 'No description available',
          windSpeed: res.wind?.speed
            ? `${res.wind.speed} m/s`
            : 'Wind data not available',
          humidity: res.main?.humidity
            ? `${res.main.humidity}%`
            : 'Humidity data not available',
          sunrise: res.sys?.sunrise
            ? new Date(res.sys.sunrise * 1000).toLocaleTimeString()
            : 'Sunrise data not available',
          sunset: res.sys?.sunset
            ? new Date(res.sys.sunset * 1000).toLocaleTimeString()
            : 'Sunset data not available',
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeather({
          city: 'Error fetching data',
          temperature: 'Error fetching data',
          feelsLike: 'Error fetching data',
          description: 'Error fetching data',
          windSpeed: 'Error fetching data',
          humidity: 'Error fetching data',
          sunrise: 'Error fetching data',
          sunset: 'Error fetching data',
        });
      }
    };

    fetchWeather();
  }, []);

  return (
    <div>
      <h2>🌤️ Current Weather</h2>
      {weather ? (
        <p>
          {weather.temperature}°C - {weather.description}
        </p>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Weather;
