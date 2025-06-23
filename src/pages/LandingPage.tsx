import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 4000); // Redirect after animation

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence>
        <motion.div
          initial={{ backgroundColor: '#000' }}
          animate={{ backgroundColor: '#0a1929' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 2.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative z-10"
            >
              <Film className="h-24 w-24 text-blue-400" />
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute top-full mt-4 text-4xl font-bold text-white whitespace-nowrap left-1/2 transform -translate-x-1/2"
            >
              stream<span className="text-blue-400">ra</span>
            </motion.h1>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;