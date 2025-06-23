import React, { useState, useEffect } from 'react';
import { X, Star, Calendar, Film, ShoppingBag, Share2, Heart, Download, Lock, Play } from 'lucide-react';
import { Movie } from '../types/movie';
import { Product } from '../types/product';
import { getProductsForMovie } from '../services/productApi';
import { getMovieVideos } from '../services/api';
import { useCredits } from '../hooks/useCredits';
import ProductCard from './ProductCard';
import RecommendMovie from './RecommendMovie';

interface MovieDetailProps {
  movie: Movie | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onRecommend: (movieId: number, friendEmail: string) => Promise<void>;
  onAddToFavorites: (movie: Movie) => void;
  onRemoveFromFavorites: (movieId: number) => void;
  onAddToDownloads: (movie: Movie) => void;
  onRemoveFromDownloads: (movieId: number) => void;
  isInFavorites: (movieId: number) => boolean;
  isInDownloads: (movieId: number) => boolean;
}

const MovieDetail: React.FC<MovieDetailProps> = ({
  movie,
  onClose,
  onAddToCart,
  onRecommend,
  onAddToFavorites,
  onRemoveFromFavorites,
  onAddToDownloads,
  onRemoveFromDownloads,
  isInFavorites,
  isInDownloads
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'watch' | 'shop'>('watch');
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showRecommend, setShowRecommend] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const { credits, canWatchMovie, unlockMovie, incrementWatchCount, getRemainingWatches, UNLOCK_COST, MAX_WATCHES } = useCredits();

  useEffect(() => {
    if (movie) {
      setLoading(true);
      Promise.all([
        getProductsForMovie(movie.id),
        getMovieVideos(movie.id)
      ])
        .then(([productsData, videosData]) => {
          setProducts(productsData);
          
          const trailer = videosData.results.find(
            video => 
              video.site === 'YouTube' && 
              (video.type === 'Trailer' || video.type === 'Teaser')
          );
          
          if (trailer) {
            setTrailerKey(trailer.key);
          }
          
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching data:', err);
          setLoading(false);
        });
    }
  }, [movie]);

  const handleRecommend = async (email: string) => {
    await onRecommend(movie!.id, email);
  };

  const handleDownload = async () => {
    if (!movie) return;
    
    setDownloading(true);
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 2000));
    onAddToDownloads(movie);
    setDownloading(false);
  };

  const handleFavoriteToggle = () => {
    if (!movie) return;
    
    if (isInFavorites(movie.id)) {
      onRemoveFromFavorites(movie.id);
    } else {
      onAddToFavorites(movie);
    }
  };

  const handleDownloadToggle = () => {
    if (!movie) return;
    
    if (isInDownloads(movie.id)) {
      onRemoveFromDownloads(movie.id);
    } else {
      handleDownload();
    }
  };

  const handleWatchClick = () => {
    if (!movie) return;
    
    if (!canWatchMovie(movie.id)) {
      const success = unlockMovie(movie.id, movie.title);
      if (!success) {
        alert('Not enough credits! You need 30 credits to unlock this movie.');
        return;
      }
    }
    
    incrementWatchCount(movie.id);
    // Start playback logic here
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

  if (!movie) return null;

  const remainingWatches = getRemainingWatches(movie.id);
  const isUnlocked = canWatchMovie(movie.id);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/90">
        <div className="relative bg-blue-900 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          <div className="absolute top-4 right-4 z-10 flex space-x-2">
            <button
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-full transition-colors ${
                isInFavorites(movie.id)
                  ? 'bg-red-500 text-white'
                  : 'bg-blue-800 text-white hover:bg-blue-700'
              }`}
              title={isInFavorites(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className="h-6 w-6" fill={isInFavorites(movie.id) ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleDownloadToggle}
              disabled={downloading}
              className={`p-2 rounded-full transition-colors ${
                isInDownloads(movie.id)
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-800 text-white hover:bg-blue-700'
              } ${downloading ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={isInDownloads(movie.id) ? 'Remove from downloads' : 'Download movie'}
            >
              <Download className="h-6 w-6" />
            </button>
            <button
              onClick={() => setShowRecommend(true)}
              className="bg-blue-800 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
              title="Recommend to a friend"
            >
              <Share2 className="h-6 w-6" />
            </button>
            <button 
              onClick={onClose}
              className="bg-blue-800 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="relative h-80 md:h-96">
            <img 
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
              alt={movie.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1920x1080?text=No+Image';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent" />
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="hidden md:block w-1/4 flex-shrink-0">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                  className="w-full rounded-lg shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x750?text=No+Image';
                  }}
                />
              </div>
              
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
                
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="flex items-center bg-blue-800 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                    <span className="text-white text-sm">{movie.vote_average.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex items-center bg-blue-800 px-3 py-1 rounded-full">
                    <Calendar className="w-4 h-4 text-blue-300 mr-1" />
                    <span className="text-white text-sm">{movie.release_date}</span>
                  </div>
                  
                  <div className="flex items-center bg-blue-800 px-3 py-1 rounded-full">
                    <Film className="w-4 h-4 text-blue-300 mr-1" />
                    <span className="text-white text-sm">{getLanguageLabel(movie.original_language)}</span>
                  </div>
                </div>
                
                <p className="text-blue-100 mb-6">{movie.overview}</p>
                
                {/* Watch Status */}
                <div className="mb-6">
                  {isUnlocked ? (
                    <div className="text-green-400 mb-2">
                      {remainingWatches} watches remaining
                    </div>
                  ) : (
                    <div className="text-blue-300 mb-2">
                      Unlock for {UNLOCK_COST} credits • Watch up to {MAX_WATCHES} times
                    </div>
                  )}
                  
                  <button
                    onClick={handleWatchClick}
                    className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center justify-center ${
                      !isUnlocked && credits < UNLOCK_COST ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={!isUnlocked && credits < UNLOCK_COST}
                  >
                    {isUnlocked ? (
                      <>
                        <Play className="w-5 h-5 mr-2" fill="currentColor" />
                        Watch Now
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Unlock Movie ({UNLOCK_COST} Credits)
                      </>
                    )}
                  </button>
                </div>

                {/* Tabs */}
                <div className="border-b border-blue-800 mb-6">
                  <div className="flex space-x-4">
                    <button
                      className={`py-3 px-4 font-medium ${
                        activeTab === 'watch'
                          ? 'text-blue-400 border-b-2 border-blue-400'
                          : 'text-blue-300 hover:text-white'
                      }`}
                      onClick={() => setActiveTab('watch')}
                    >
                      Watch Movie
                    </button>
                    <button
                      className={`py-3 px-4 font-medium flex items-center ${
                        activeTab === 'shop'
                          ? 'text-blue-400 border-b-2 border-blue-400'
                          : 'text-blue-300 hover:text-white'
                      }`}
                      onClick={() => setActiveTab('shop')}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Shop Products
                    </button>
                  </div>
                </div>
                
                {/* Tab Content */}
                {activeTab === 'watch' ? (
                  <div className="aspect-w-16 aspect-h-9 mb-6">
                    {trailerKey ? (
                      <div className="w-full h-0 pb-[56.25%] relative">
                        <iframe
                          className="absolute inset-0 w-full h-full rounded-lg"
                          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&rel=0`}
                          title={`${movie.title} Trailer`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div className="w-full h-0 pb-[56.25%] relative bg-blue-800 rounded-lg flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center justify-center text-blue-300">
                          No trailer available
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      Products Featured in "{movie.title}"
                    </h3>
                    
                    {loading ? (
                      <div className="text-blue-300 py-4">Loading products...</div>
                    ) : products.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {products.map(product => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            onAddToCart={onAddToCart} 
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-blue-300 py-4">No products found for this movie.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showRecommend && (
        <RecommendMovie
          movie={movie}
          onClose={() => setShowRecommend(false)}
          onRecommend={handleRecommend}
        />
      )}
    </>
  );
};

export default MovieDetail;