'use client';
import React from 'react';
import { useOpenWeatherQuery } from '@/service/apiService';

interface WeatherProps {
  style?: React.CSSProperties;
}

const Weather: React.FC<WeatherProps> = ({ style }) => {
  const { data: weather, isLoading, error } = useOpenWeatherQuery();

  if (isLoading) return <p>Loading weather...</p>;
  if (error) return <p>Error fetching weather data</p>;

  return (
    <div
      style={style}
      className="flex justify-center items-center h-full w-full "
    >
      {/* <div className="flex flex-col justify-center items-center bg-gradient-to-b from-[#005EB8] to-[#edf3f1] text-gray-900 px-4 py-8 rounded-lg text-sm 2xl:px-20 2xl:py-4 2xl:rounded-xl 2xl:text-md 2xl:text-lg font-semibold shadow-lg w-full max-w-[250px] 2xl:max-w-md h-full border border-gray-300 mb-8"> */}
      <div className="flex flex-col justify-center items-center  text-gray-900 px-4 py-8 rounded-lg text-sm 2xl:px-20 2xl:py-4 2xl:rounded-xl 2xl:text-md 2xl:text-lg font-semibold  w-full max-w-[250px] 2xl:max-w-md h-full  mb-8">
        {/* <h2 className="text-xl 3xl:text-xl font-bold text-center mb-3 2xl:mb-4 text-black">
          Tsim Sha Tsui, HK
        </h2> */}

        {weather && (
          <div className="flex flex-col justify-center items-center space-y-3 2xl:space-y-4 flex-grow">
            {/* Weather Icon */}
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather?.[0].icon}@4x.png`}
              alt="Weather icon"
              className="w-48 2xl:w-48 bg-[#005EB8] rounded-full"
            />

            {/* Weather Description */}
            <p className="text-lg 2xl:text-3xl font-medium text-gray-700 capitalize">
              {weather.weather?.[0].description}
            </p>

            {/* Temperature */}
            <div className="text-4xl 2xl:text-6xl font-bold text-gray-800">
              {weather.main.temp}°C
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
