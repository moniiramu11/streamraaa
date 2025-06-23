import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Film, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginPageProps {
  onLogin: (email: string, password: string) => boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!isLogin && !name) {
      setError('Please enter your name');
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isLogin) {
        const success = onLogin(email, password);
        if (success) {
          navigate('/subscribe');
        } else {
          setError('Invalid email or password');
        }
      } else {
        // For demo, just switch to login after signup
        setIsLogin(true);
        setError('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-blue-950 flex flex-col"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-blue-950" />
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-400 rounded-full"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(70px)',
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 10 + 20,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Film className="h-10 w-10 text-blue-400" />
            <h1 className="ml-2 text-3xl font-bold text-white">
              stream<span className="text-blue-400">ra</span>
            </h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center relative z-10 px-4 py-10">
        <motion.div
          variants={containerVariants}
          className="bg-blue-900/80 backdrop-blur-md rounded-2xl shadow-xl max-w-md w-full p-8 md:p-10"
        >
          <Link to="/" className="inline-flex items-center text-blue-300 hover:text-blue-400 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <motion.div variants={formVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-blue-300 mb-8">
              {isLogin 
                ? 'Sign in to continue to streamra' 
                : 'Join streamra for unlimited movies and shows'}
            </p>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-6">
                  <label htmlFor="name" className="block text-blue-200 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-blue-800/50 border border-blue-700 rounded-lg px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your full name"
                  />
                </div>
              )}
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-blue-200 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-blue-800/50 border border-blue-700 rounded-lg px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="mb-8">
                <label htmlFor="password" className="block text-blue-200 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-blue-800/50 border border-blue-700 rounded-lg px-4 py-3 text-white placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-blue-300">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="ml-2 text-blue-400 hover:text-blue-300 font-medium"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>
            
            {isLogin && (
              <div className="mt-4 text-center">
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  Forgot password?
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-blue-400 text-sm">
        <p>&copy; {new Date().getFullYear()} streamra. All rights reserved.</p>
      </footer>
    </motion.div>
  );
};

export default LoginPage;