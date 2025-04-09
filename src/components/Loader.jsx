import React from 'react';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';

function Loader() {
  return (
    <motion.div
      className="text-blue-600 text-center mt-4 text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Loading weather data...
    </motion.div>
  );
}

export default Loader;
