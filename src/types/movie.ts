export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  original_language: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface MovieVideoResponse {
  id: number;
  results: MovieVideo[];
}

export interface UserMovieList {
  favorites: Movie[];
  downloads: Movie[];
}