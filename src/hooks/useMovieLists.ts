import { useState, useEffect } from 'react';
import { Movie, UserMovieList } from '../types/movie';

export const useMovieLists = () => {
  const [lists, setLists] = useState<UserMovieList>(() => {
    const savedLists = localStorage.getItem('streamra_movie_lists');
    return savedLists ? JSON.parse(savedLists) : { favorites: [], downloads: [] };
  });

  useEffect(() => {
    localStorage.setItem('streamra_movie_lists', JSON.stringify(lists));
  }, [lists]);

  const addToFavorites = (movie: Movie) => {
    setLists(prev => ({
      ...prev,
      favorites: prev.favorites.some(m => m.id === movie.id)
        ? prev.favorites
        : [...prev.favorites, movie]
    }));
  };

  const removeFromFavorites = (movieId: number) => {
    setLists(prev => ({
      ...prev,
      favorites: prev.favorites.filter(movie => movie.id !== movieId)
    }));
  };

  const addToDownloads = (movie: Movie) => {
    setLists(prev => ({
      ...prev,
      downloads: prev.downloads.some(m => m.id === movie.id)
        ? prev.downloads
        : [...prev.downloads, movie]
    }));
  };

  const removeFromDownloads = (movieId: number) => {
    setLists(prev => ({
      ...prev,
      downloads: prev.downloads.filter(movie => movie.id !== movieId)
    }));
  };

  const isInFavorites = (movieId: number) => {
    return lists.favorites.some(movie => movie.id === movieId);
  };

  const isInDownloads = (movieId: number) => {
    return lists.downloads.some(movie => movie.id === movieId);
  };

  return {
    lists,
    addToFavorites,
    removeFromFavorites,
    addToDownloads,
    removeFromDownloads,
    isInFavorites,
    isInDownloads
  };
};