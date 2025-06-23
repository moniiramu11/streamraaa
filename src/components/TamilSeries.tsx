import React, { useState, useEffect } from 'react';
import { Play, ShoppingBag, Star } from 'lucide-react';
import axios from 'axios';
import { Product } from '../types/product';
import { getProductsForMovie } from '../services/productApi';
import ProductCard from './ProductCard';

interface Series {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
  overview: string;
  vote_average: number;
}

interface TamilSeriesProps {
  onAddToCart: (product: Product) => void;
}

const TamilSeries: React.FC<TamilSeriesProps> = ({ onAddToCart }) => {
  const [series, setSeries] = useState<Series[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'watch' | 'shop'>('watch');

  useEffect(() => {
    const fetchTamilSeries = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/tv', {
          params: {
            api_key: '47837b662d7a3785cb2e0b55196fba77',
            with_original_language: 'ta',
            sort_by: 'popularity.desc'
          },
        });
        setSeries(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Tamil series:', error);
        setLoading(false);
      }
    };

    fetchTamilSeries();
  }, []);

  useEffect(() => {
    if (selectedSeries) {
      const fetchProducts = async () => {
        const seriesProducts = await getProductsForMovie(selectedSeries.id);
        setProducts(seriesProducts);
      };
      fetchProducts();
    }
  }, [selectedSeries]);

  const handleSeriesClick = (series: Series) => {
    setSelectedSeries(series);
    setActiveTab('watch');
  };

  const handleClose = () => {
    setSelectedSeries(null);
    setProducts([]);
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="text-blue-400">Loading Tamil series...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Tamil Series</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {series.map((item) => (
          <div 
            key={item.id} 
            className="bg-blue-900 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => handleSeriesClick(item)}
          >
            <div className="relative aspect-[2/3]">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x750?text=No+Image';
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 p-4">
                <h3 className="text-white font-semibold truncate">{item.name}</h3>
                <div className="flex items-center text-blue-300 text-sm">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  {item.vote_average.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Series Detail Modal */}
      {selectedSeries && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/90">
          <div className="bg-blue-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/w1280${selectedSeries.poster_path}`}
                alt={selectedSeries.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white bg-blue-900/80 p-2 rounded-full"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{selectedSeries.name}</h2>
              <p className="text-blue-300 mb-4">{selectedSeries.overview}</p>

              {/* Tabs */}
              <div className="flex border-b border-blue-800 mb-6">
                <button
                  className={`py-2 px-4 ${
                    activeTab === 'watch'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-blue-300'
                  }`}
                  onClick={() => setActiveTab('watch')}
                >
                  <Play className="inline-block w-4 h-4 mr-2" />
                  Watch
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === 'shop'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-blue-300'
                  }`}
                  onClick={() => setActiveTab('shop')}
                >
                  <ShoppingBag className="inline-block w-4 h-4 mr-2" />
                  Shop
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'watch' ? (
                <div className="space-y-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center justify-center w-full">
                    <Play className="w-5 h-5 mr-2" fill="currentColor" />
                    Watch Now
                  </button>
                  <p className="text-blue-300 text-sm">
                    First aired: {new Date(selectedSeries.first_air_date).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={onAddToCart}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TamilSeries;