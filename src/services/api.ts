import axios from 'axios';
import { MovieResponse, MovieVideoResponse } from '../types/movie';

const API_KEY = '47837b662d7a3785cb2e0b55196fba77';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getMoviesByLanguage = async (language: string, page = 1): Promise<MovieResponse> => {
  const response = await api.get('/discover/movie', {
    params: {
      with_original_language: language,
      sort_by: 'popularity.desc',
      page,
    },
  });
  return response.data;
};

export const getTrendingMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await api.get('/trending/movie/week', {
    params: {
      page,
    },
  });
  return response.data;
};

export const getTopRatedMovies = async (page = 1): Promise<MovieResponse> => {
  const response = await api.get('/movie/top_rated', {
    params: {
      page,
    },
  });
  return response.data;
};

export const getMovieDetails = async (id: number) => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};

export const getMovieVideos = async (movieId: number): Promise<MovieVideoResponse> => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data;
};

export const searchMovies = async (query: string, page = 1): Promise<MovieResponse> => {
  const response = await api.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};