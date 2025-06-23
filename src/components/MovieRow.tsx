import React from 'react';
import MovieCard from './MovieCard';
import { Movie } from '../types/movie';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onMovieClick }) => {
  const rowRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div className="relative group">
        <div 
          className="absolute left-0 top-0 bottom-0 flex items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('left')}
        >
          <button className="p-2 rounded-full bg-blue-900/80 text-white hover:bg-blue-800 ml-2">
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div 
          ref={rowRef}
          className="flex overflow-x-scroll space-x-4 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map(movie => (
            <div key={movie.id} className="flex-none w-[180px]">
              <MovieCard movie={movie} onClick={onMovieClick} />
            </div>
          ))}
        </div>
        
        <div 
          className="absolute right-0 top-0 bottom-0 flex items-center z-10 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('right')}
        >
          <button className="p-2 rounded-full bg-blue-900/80 text-white hover:bg-blue-800 mr-2">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieRow;