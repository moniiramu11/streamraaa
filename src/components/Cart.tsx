import React from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { Product } from '../types/product';

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ 
  items, 
  isOpen, 
  onClose, 
  onRemoveItem, 
  onUpdateQuantity,
  onCheckout
}) => {
  if (!isOpen) return null;

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/90">
      <div className="relative bg-blue-900 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-blue-900 p-4 border-b border-blue-800 flex justify-between items-center">
          <div className="flex items-center">
            <ShoppingBag className="h-6 w-6 text-blue-400 mr-2" />
            <h2 className="text-xl font-bold text-white">Your Cart ({totalItems})</h2>
          </div>
          <button 
            onClick={onClose}
            className="bg-blue-800 p-2 rounded-full text-white hover:bg-blue-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-blue-300 mb-4">Your cart is empty</p>
            <button 
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="p-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center py-4 border-b border-blue-800">
                  <div className="h-16 w-16 bg-white rounded flex-shrink-0 p-2 flex items-center justify-center">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-white text-sm font-medium line-clamp-1">{item.title}</h3>
                    <p className="text-blue-300 text-sm">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center">
                    <button 
                      onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="text-blue-300 hover:text-white px-2"
                    >
                      -
                    </button>
                    <span className="text-white mx-2">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="text-blue-300 hover:text-white px-2"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(item.id)}
                    className="ml-4 text-blue-300 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-blue-800">
              <div className="flex justify-between mb-4">
                <span className="text-blue-300">Subtotal</span>
                <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-full transition-colors font-bold"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;