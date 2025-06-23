import React from 'react';
import { Star } from 'lucide-react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  const getLanguageLabel = (code: string): string => {
    switch (code) {
      case 'en': return 'English';
      case 'ta': return 'Tamil';
      case 'te': return 'Telugu';
      case 'ml': return 'Malayalam';
      default: return code.toUpperCase();
    }
  };

  return (
    <div 
      className="relative flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer bg-blue-950"
      onClick={handleClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x750?text=No+Image';
          }}
        />
        <div className="absolute top-2 right-2 bg-blue-900 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {getLanguageLabel(movie.original_language)}
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{movie.title}</h3>
        <p className="text-blue-300 text-sm mb-2">{movie.release_date?.split('-')[0] || 'N/A'}</p>
        <div className="flex items-center mt-auto">
          <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
          <span className="text-white text-sm">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;