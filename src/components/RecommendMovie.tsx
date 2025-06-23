import React, { useState } from 'react';
import { Send, X } from 'lucide-react';
import { Movie } from '../types/movie';

interface RecommendMovieProps {
  movie: Movie;
  onClose: () => void;
  onRecommend: (email: string) => Promise<void>;
}

const RecommendMovie: React.FC<RecommendMovieProps> = ({ movie, onClose, onRecommend }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onRecommend(email);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Failed to send recommendation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/90">
      <div className="bg-blue-900 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Recommend Movie</h2>
          <button 
            onClick={onClose}
            className="text-blue-300 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="text-green-400 mb-2">✓</div>
            <p className="text-white">Recommendation sent successfully!</p>
            <p className="text-blue-300 text-sm mt-2">
              You'll earn 100 points when your friend watches this movie.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-blue-300 mb-4">
                Recommend "{movie.title}" to a friend and earn 100 points when they watch it!
              </p>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <label htmlFor="email" className="block text-blue-200 text-sm font-medium mb-2">
                Friend's Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-blue-800/50 border border-blue-700 rounded-lg px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your friend's email"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send Recommendation
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RecommendMovie;