import React from 'react';
import { motion } from 'framer-motion';

function WeatherCard({ weather }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg space-y-4 text-center text-blue-900"
    >
      <h2 className="text-2xl font-semibold">{weather.name}</h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="w-20 h-20"
        />
        <div>
          <p className="text-3xl font-bold">{weather.main.temp}°C</p>
          <p className="capitalize">{weather.weather[0].description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-white/70 p-4 rounded-lg shadow text-sm">
          <p className="font-medium">Humidity</p>
          <p>{weather.main.humidity}%</p>
        </div>
        <div className="bg-white/70 p-4 rounded-lg shadow text-sm">
          <p className="font-medium">Wind</p>
          <p>{weather.wind.speed} km/h</p>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherCard;
