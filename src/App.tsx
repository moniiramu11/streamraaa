import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import MovieDetail from './components/MovieDetail';
import Footer from './components/Footer';
import Cart from './components/Cart';
import TamilSeries from './components/TamilSeries';
import { Movie } from './types/movie';
import { Product } from './types/product';
import { useMovieLists } from './hooks/useMovieLists';
import { 
  getTrendingMovies, 
  getTopRatedMovies, 
  getMoviesByLanguage,
  searchMovies 
} from './services/api';

interface CartItem extends Product {
  quantity: number;
}

interface AppProps {
  onLogout: () => void;
}

function App({ onLogout }: AppProps) {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [englishMovies, setEnglishMovies] = useState<Movie[]>([]);
  const [tamilMovies, setTamilMovies] = useState<Movie[]>([]);
  const [teluguMovies, setTeluguMovies] = useState<Movie[]>([]);
  const [malayalamMovies, setMalayalamMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTamilSeries, setShowTamilSeries] = useState(false);
  const [activeSection, setActiveSection] = useState<'movies' | 'series'>('movies');
  
  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Movie lists (favorites and downloads)
  const {
    lists,
    addToFavorites,
    removeFromFavorites,
    addToDownloads,
    removeFromDownloads,
    isInFavorites,
    isInDownloads
  } = useMovieLists();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        // Fetch trending movies for hero section and trending row
        const trending = await getTrendingMovies();
        setTrendingMovies(trending.results.filter(movie => movie.backdrop_path));
        
        // Fetch top rated movies
        const topRated = await getTopRatedMovies();
        setTopRatedMovies(topRated.results);
        
        // Fetch movies by language
        const english = await getMoviesByLanguage('en');
        setEnglishMovies(english.results);
        
        const tamil = await getMoviesByLanguage('ta');
        setTamilMovies(tamil.results);
        
        const telugu = await getMoviesByLanguage('te');
        setTeluguMovies(telugu.results);
        
        const malayalam = await getMoviesByLanguage('ml');
        setMalayalamMovies(malayalam.results);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
        console.error('Error fetching movies:', err);
      }
    };
    
    fetchMovies();
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    
    try {
      setIsSearching(true);
      const results = await searchMovies(query);
      setSearchResults(results.results);
    } catch (err) {
      console.error('Error searching movies:', err);
    }
  };

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseMovieDetail = () => {
    setSelectedMovie(null);
  };

  const handleSectionChange = (section: 'movies' | 'series') => {
    setActiveSection(section);
    setShowTamilSeries(section === 'series');
    setIsSearching(false);
    setSearchResults([]);
  };

  // Cart functions
  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const handleCheckout = () => {
    alert('Thank you for your purchase! This is a demo checkout.');
    setCartItems([]);
    setIsCartOpen(false);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-950 flex items-center justify-center">
        <div className="text-white text-2xl">Loading amazing movies for you...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-blue-950 flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-950">
      <Header 
        onSearch={handleSearch} 
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        onLogout={onLogout}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      
      {!isSearching && activeSection === 'movies' && trendingMovies.length > 0 && (
        <Hero movies={trendingMovies.slice(0, 5)} />
      )}
      
      <main className="container mx-auto px-4 py-8">
        {activeSection === 'series' ? (
          <TamilSeries 
            onAddToCart={handleAddToCart}
            onAddToFavorites={addToFavorites}
            onRemoveFromFavorites={removeFromFavorites}
            onAddToDownloads={addToDownloads}
            onRemoveFromDownloads={removeFromDownloads}
            isInFavorites={isInFavorites}
            isInDownloads={isInDownloads}
          />
        ) : isSearching ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-white">Search Results</h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {searchResults.map(movie => (
                  <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
                ))}
              </div>
            ) : (
              <p className="text-white text-lg">No results found. Try a different search term.</p>
            )}
          </>
        ) : (
          <>
            <MovieRow 
              title="Trending Now" 
              movies={trendingMovies} 
              onMovieClick={handleMovieClick} 
            />
            <MovieRow 
              title="Top Rated" 
              movies={topRatedMovies} 
              onMovieClick={handleMovieClick} 
            />
            <MovieRow 
              title="English Movies" 
              movies={englishMovies} 
              onMovieClick={handleMovieClick} 
            />
            <MovieRow 
              title="Tamil Movies" 
              movies={tamilMovies} 
              onMovieClick={handleMovieClick} 
            />
            <MovieRow 
              title="Telugu Movies" 
              movies={teluguMovies} 
              onMovieClick={handleMovieClick} 
            />
            <MovieRow 
              title="Malayalam Movies" 
              movies={malayalamMovies} 
              onMovieClick={handleMovieClick} 
            />
          </>
        )}
      </main>
      
      <Footer />
      
      {selectedMovie && (
        <MovieDetail 
          movie={selectedMovie} 
          onClose={handleCloseMovieDetail}
          onAddToCart={handleAddToCart}
          onAddToFavorites={addToFavorites}
          onRemoveFromFavorites={removeFromFavorites}
          onAddToDownloads={addToDownloads}
          onRemoveFromDownloads={removeFromDownloads}
          isInFavorites={isInFavorites}
          isInDownloads={isInDownloads}
        />
      )}

      <Cart 
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

// Import MovieCard component for search results
import MovieCard from './components/MovieCard';

export default App;