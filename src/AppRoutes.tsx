import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SubscriptionPage from './pages/SubscriptionPage';
import App from './App';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if user is logged in and subscribed
    const token = localStorage.getItem('streamra_token');
    const subscription = localStorage.getItem('streamra_subscription');
    if (token) {
      setIsAuthenticated(true);
      if (subscription) {
        setIsSubscribed(true);
      }
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    if (email && password) {
      localStorage.setItem('streamra_token', 'mock_token_123');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('streamra_token');
    localStorage.removeItem('streamra_subscription');
    setIsAuthenticated(false);
    setIsSubscribed(false);
  };

  const handleSubscribe = (plan: string) => {
    localStorage.setItem('streamra_subscription', JSON.stringify({
      plan,
      startDate: new Date().toISOString()
    }));
    setIsSubscribed(true);
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
              isSubscribed ?
                <Navigate to="/browse" /> :
                <Navigate to="/subscribe" /> :
              <LandingPage />
          } 
        />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
              isSubscribed ?
                <Navigate to="/browse" /> :
                <Navigate to="/subscribe" /> :
              <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/subscribe" 
          element={
            !isAuthenticated ? 
              <Navigate to="/login" /> :
              isSubscribed ?
                <Navigate to="/browse" /> :
                <SubscriptionPage onSubscribe={handleSubscribe} />
          } 
        />
        <Route 
          path="/browse/*" 
          element={
            !isAuthenticated ? 
              <Navigate to="/login" /> :
              !isSubscribed ?
                <Navigate to="/subscribe" /> :
                <App onLogout={handleLogout} />
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;