import React, { useState, useEffect } from 'react';
import { Play, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types/movie';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroProps {
  movies: Movie[];
}

const Hero: React.FC<HeroProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length, isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    
    setMousePosition({ x: x - 0.5, y: y - 0.5 });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const currentMovie = movies[currentIndex];

  if (!currentMovie) return null;

  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-blue-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center p-8"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: '1000px'
          }}
        >
          {/* 3D Card Container */}
          <motion.div
            className="relative w-full h-full rounded-[30px] overflow-hidden shadow-2xl"
            style={{
              transformStyle: 'preserve-3d',
              transform: `
                rotateY(${mousePosition.x * 20}deg)
                rotateX(${-mousePosition.y * 20}deg)
              `
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden rounded-[30px]">
              <img 
                src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`} 
                alt={currentMovie.title}
                className="w-full h-full object-cover scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg';
                }}
              />
              {/* Curved Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/60 to-transparent" 
                style={{
                  borderRadius: '30px',
                  maskImage: 'linear-gradient(to bottom, transparent, black)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/40 to-transparent"
                style={{
                  borderRadius: '30px',
                  maskImage: 'linear-gradient(to right, black, transparent)'
                }}
              />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                  {currentMovie.title}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-blue-300 drop-shadow">
                    {currentMovie.release_date?.split('-')[0] || 'N/A'}
                  </span>
                  <span className="bg-blue-600/80 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium">
                    {currentMovie.vote_average.toFixed(1)} Rating
                  </span>
                </div>
                <p className="text-white text-lg mb-6 line-clamp-3 md:line-clamp-none drop-shadow-lg">
                  {currentMovie.overview}
                </p>
                <div className="flex flex-wrap gap-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors backdrop-blur-sm"
                  >
                    <Play className="mr-2 h-5 w-5" fill="currentColor" />
                    Play Now
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-full transition-colors backdrop-blur-sm"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Add to List
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 pointer-events-none">
        <button
          onClick={handlePrevious}
          className="p-3 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-colors transform hover:scale-110 pointer-events-auto"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm transition-colors transform hover:scale-110 pointer-events-auto"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-blue-400 w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;