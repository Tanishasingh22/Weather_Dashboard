import React from 'react';
import { motion } from 'framer-motion';

function Error({ message }) {
  return (
    <motion.div
      className="text-red-600 text-center mt-4 font-semibold"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {message}
    </motion.div>
  );
}

export default Error;
