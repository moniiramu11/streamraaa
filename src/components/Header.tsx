import React, { useState } from 'react';
import { Search, Film, Bell, User, Menu, X, ShoppingBag, LogOut, Download, Play, Laugh, Video, Skull, AlertTriangle, Users, Coins } from 'lucide-react';
import WatchTogether from './WatchTogether';
import CreditsModal from './CreditsModal';
import { useCredits } from '../hooks/useCredits';

interface HeaderProps {
  onSearch: (query: string) => void;
  cartItemCount: number;
  onCartClick: () => void;
  onLogout?: () => void;
  activeSection: 'movies' | 'series';
  onSectionChange: (section: 'movies' | 'series') => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  cartItemCount, 
  onCartClick, 
  onLogout,
  activeSection,
  onSectionChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showWatchTogether, setShowWatchTogether] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const { credits, transactions: creditTransactions } = useCredits();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const categories = [
    { name: 'My List', icon: <Play className="w-4 h-4" /> },
    { name: 'Downloads', icon: <Download className="w-4 h-4" /> },
    { name: 'Action', icon: <Video className="w-4 h-4" /> },
    { name: 'Blockbusters', icon: <Film className="w-4 h-4" /> },
    { name: 'Comedies', icon: <Laugh className="w-4 h-4" /> },
    { name: 'Documentaries', icon: <Video className="w-4 h-4" /> },
    { name: 'Horror', icon: <Skull className="w-4 h-4" /> },
    { name: 'Thrillers', icon: <AlertTriangle className="w-4 h-4" /> },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-blue-950 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Film className="h-8 w-8 text-blue-400" />
              <h1 className="ml-2 text-2xl font-bold text-white">
                stream<span className="text-blue-400">ra</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => onSectionChange('movies')}
                className={`text-white hover:text-blue-400 transition-colors ${
                  activeSection === 'movies' ? 'text-blue-400' : ''
                }`}
              >
                Movies
              </button>
              <button 
                onClick={() => onSectionChange('series')}
                className={`text-white hover:text-blue-400 transition-colors ${
                  activeSection === 'series' ? 'text-blue-400' : ''
                }`}
              >
                Series
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-blue-400 transition-colors flex items-center"
              >
                <Menu className="h-5 w-5 mr-1" />
                Categories
              </button>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-6">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="w-full py-2 pl-10 pr-4 rounded-full bg-blue-900 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-blue-300" />
              </form>
            </div>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                className="text-white hover:text-blue-400"
                onClick={() => setShowWatchTogether(true)}
                title="Watch Together"
              >
                <Users className="h-6 w-6" />
              </button>
              <button 
                className="text-white hover:text-blue-400"
                onClick={() => setShowCredits(true)}
                title="Your Credits"
              >
                <div className="relative">
                  <Coins className="h-6 w-6 text-yellow-400" />
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {credits}
                  </span>
                </div>
              </button>
              <button 
                className="text-white hover:text-blue-400 relative"
                onClick={onCartClick}
              >
                <ShoppingBag className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button className="text-white hover:text-blue-400">
                <Bell className="h-6 w-6" />
              </button>
              <div className="relative group">
                <button className="flex items-center text-white hover:text-blue-400">
                  <User className="h-6 w-6" />
                </button>
                {onLogout && (
                  <div className="absolute right-0 mt-2 w-48 bg-blue-900 rounded-md shadow-lg py-1 hidden group-hover:block">
                    <button 
                      onClick={onLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-blue-800"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-3">
              <button 
                className="text-white hover:text-blue-400 relative"
                onClick={onCartClick}
              >
                <ShoppingBag className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button 
                className="text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Categories Menu */}
          {isMenuOpen && (
            <div className="absolute left-0 right-0 mt-4 bg-blue-900 shadow-lg py-4 px-6 border-t border-blue-800">
              <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <a
                      key={category.name}
                      href="#"
                      className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors py-2"
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mobile Search and Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <form onSubmit={handleSubmit} className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="w-full py-2 pl-10 pr-4 rounded-full bg-blue-900 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-blue-300" />
              </form>
              <nav className="flex flex-col space-y-3">
                <button 
                  onClick={() => onSectionChange('movies')}
                  className={`text-white hover:text-blue-400 transition-colors text-left py-2 ${
                    activeSection === 'movies' ? 'text-blue-400' : ''
                  }`}
                >
                  Movies
                </button>
                <button 
                  onClick={() => onSectionChange('series')}
                  className={`text-white hover:text-blue-400 transition-colors text-left py-2 ${
                    activeSection === 'series' ? 'text-blue-400' : ''
                  }`}
                >
                  Series
                </button>
                <button
                  onClick={() => setShowWatchTogether(true)}
                  className="flex items-center text-white hover:text-blue-400 transition-colors py-2"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Watch Together
                </button>
                <button
                  onClick={() => setShowCredits(true)}
                  className="flex items-center text-white hover:text-blue-400 transition-colors py-2"
                >
                  <Coins className="h-4 w-4 mr-2" />
                  Credits ({credits})
                </button>
                {categories.map((category) => (
                  <a
                    key={category.name}
                    href="#"
                    className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors py-2"
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </a>
                ))}
                {onLogout && (
                  <button 
                    onClick={onLogout}
                    className="flex items-center text-white hover:text-blue-400 transition-colors py-2"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Watch Together Modal */}
      {showWatchTogether && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/90">
          <div className="relative bg-blue-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowWatchTogether(false)}
              className="absolute top-4 right-4 text-blue-300 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <WatchTogether />
          </div>
        </div>
      )}

      {showCredits && (
        <CreditsModal
          credits={credits}
          transactions={creditTransactions}
          onClose={() => setShowCredits(false)}
        />
      )}
    </>
  );
};

export default Header;