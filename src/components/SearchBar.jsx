import React, { useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

function SearchBar({ city, setCity, onSearch }) {
  const inputRef = useRef(null);

  // Autofocus on page load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <motion.div
      className="flex justify-center mb-6 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <form
        onSubmit={onSearch}
        className="flex items-center w-full max-w-md bg-white/80 dark:bg-gray-800/70 backdrop-blur-md border border-blue-300 dark:border-gray-600 rounded-full shadow-md overflow-hidden"
      >
        <div className="px-4 text-blue-600 dark:text-gray-300">
          <FiSearch size={20} />
        </div>
        <input
          type="text"
          ref={inputRef}
          placeholder="Search for a city"
          className="flex-1 py-2 px-2 bg-transparent text-blue-900 dark:text-white placeholder-blue-400 dark:placeholder-gray-400 focus:outline-none focus:ring-0"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium rounded-r-full transition duration-200"
        >
          Search
        </button>
      </form>
    </motion.div>
  );
}

export default SearchBar;
