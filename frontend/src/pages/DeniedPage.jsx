import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DeniedPage = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-amber-50 text-gray-700 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-7xl font-extrabold text-amber-600 mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        403
      </motion.h1>

      <motion.h2
        className="text-2xl font-semibold mb-2"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        Access Denied
      </motion.h2>

      <motion.p
        className="text-gray-500 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Oops! You're not authorized to jump on this page.
      </motion.p>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.6 }}
      >
        <Link to="/">
          <button className="px-6 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition shadow-lg">
            Go Back Home
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default DeniedPage;
