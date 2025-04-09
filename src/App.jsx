import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import Loader from './components/Loader';
import Error from './components/Error';
import { AnimatePresence, motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecents, setShowRecents] = useState(false);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const API_KEY = '881ec0a4be342031b661ea40f8247d1b'; 
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setCity('');
      if (!recentSearches.includes(cityName)) {
        setRecentSearches((prev) => [cityName, ...prev.slice(0, 4)]);
      }
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-300 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-2xl"
      >
        <h1 className="text-4xl font-bold text-blue-900 dark:text-white text-center mb-6">
          🌦️ Weather Dashboard
        </h1>

        {/* Search Bar */}
        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

        {/* 🔁 Collapsible Recent Searches */}
        {recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mb-4"
          >
            <button
              onClick={() => setShowRecents(!showRecents)}
              className="flex items-center justify-between w-full px-4 py-2 bg-white/70 dark:bg-gray-800/60 text-blue-900 dark:text-white font-medium rounded-md shadow hover:bg-white/80 transition"
            >
              <span className="flex items-center gap-2">
                <FiClock />
                Recent Searches
              </span>
              <span>{showRecents ? '▲' : '▼'}</span>
            </button>

            <AnimatePresence>
              {showRecents && (
                <motion.ul
                  key="recents-list"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-2 bg-white/50 dark:bg-gray-700/50 rounded-lg shadow p-2"
                >
                  {recentSearches.map((c, i) => (
                    <li key={i}>
                      <button
                        onClick={() => fetchWeather(c)}
                        className="w-full text-left px-3 py-1 rounded hover:bg-blue-100 dark:hover:bg-gray-600 transition text-blue-800 dark:text-white"
                      >
                        {c}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Weather Info */}
        <AnimatePresence>
          {loading && <Loader />}
          {error && <Error message={error} />}
          {weather && <WeatherCard weather={weather} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
