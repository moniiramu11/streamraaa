import React from 'react';
import { ShoppingCart, Star, ExternalLink } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // Mock shop links based on category
  const getShopLinks = () => {
    const baseLinks = {
      amazon: `https://www.amazon.in/s?k=${encodeURIComponent(product.title)}`,
      flipkart: `https://www.flipkart.com/search?q=${encodeURIComponent(product.title)}`,
      myntra: `https://www.myntra.com/${encodeURIComponent(product.title.toLowerCase().replace(/\s+/g, '-'))}`,
    };

    return baseLinks;
  };

  const shopLinks = product.shopLinks || getShopLinks();

  return (
    <div className="bg-blue-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 bg-white p-4 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.title}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
          }}
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
          Rs {product.price.toFixed(0)}
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-md font-bold text-white mb-1 line-clamp-2">{product.title}</h3>
        <p className="text-blue-300 text-xs mb-2 line-clamp-2">{product.category}</p>
        <div className="flex items-center mb-3">
          <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
          <span className="text-white text-sm">{product.rating.rate.toFixed(1)}</span>
          <span className="text-blue-300 text-xs ml-2">({product.rating.count} reviews)</span>
        </div>

        {/* Shop Links */}
        <div className="mt-2 mb-4 space-y-2">
          {Object.entries(shopLinks).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-1.5 bg-blue-800/50 hover:bg-blue-700/50 rounded-md text-sm text-white transition-colors"
            >
              <span className="capitalize">{platform}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ))}
        </div>

        <button 
          onClick={() => onAddToCart(product)}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full flex items-center justify-center transition-colors"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;