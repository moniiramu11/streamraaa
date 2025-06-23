import { useState, useEffect } from 'react';
import { UserCredits, CreditTransaction } from '../types/credits';

const INITIAL_CREDITS = 100;
const UNLOCK_COST = 30;
const MAX_WATCHES = 5;

export const useCredits = () => {
  const [userCredits, setUserCredits] = useState<UserCredits>(() => {
    const saved = localStorage.getItem('streamra_credits');
    return saved ? JSON.parse(saved) : {
      credits: INITIAL_CREDITS,
      unlockedMovies: {}
    };
  });

  const [transactions, setTransactions] = useState<CreditTransaction[]>(() => {
    const saved = localStorage.getItem('streamra_credit_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('streamra_credits', JSON.stringify(userCredits));
    localStorage.setItem('streamra_credit_transactions', JSON.stringify(transactions));
  }, [userCredits, transactions]);

  const canWatchMovie = (movieId: number): boolean => {
    const movie = userCredits.unlockedMovies[movieId];
    if (!movie) return false;
    return movie.watchCount < MAX_WATCHES;
  };

  const unlockMovie = (movieId: number, movieTitle: string): boolean => {
    if (userCredits.credits < UNLOCK_COST) return false;

    const newTransaction: CreditTransaction = {
      id: Date.now().toString(),
      amount: UNLOCK_COST,
      type: 'debit',
      movieId,
      timestamp: new Date().toISOString(),
      description: `Unlocked "${movieTitle}"`
    };

    setUserCredits(prev => ({
      ...prev,
      credits: prev.credits - UNLOCK_COST,
      unlockedMovies: {
        ...prev.unlockedMovies,
        [movieId]: {
          watchCount: 0,
          unlockDate: new Date().toISOString()
        }
      }
    }));

    setTransactions(prev => [...prev, newTransaction]);
    return true;
  };

  const incrementWatchCount = (movieId: number): void => {
    setUserCredits(prev => ({
      ...prev,
      unlockedMovies: {
        ...prev.unlockedMovies,
        [movieId]: {
          ...prev.unlockedMovies[movieId],
          watchCount: prev.unlockedMovies[movieId].watchCount + 1
        }
      }
    }));
  };

  const getRemainingWatches = (movieId: number): number => {
    const movie = userCredits.unlockedMovies[movieId];
    if (!movie) return 0;
    return MAX_WATCHES - movie.watchCount;
  };

  const addCredits = (amount: number, reason: string) => {
    const newTransaction: CreditTransaction = {
      id: Date.now().toString(),
      amount,
      type: 'credit',
      timestamp: new Date().toISOString(),
      description: reason
    };

    setUserCredits(prev => ({
      ...prev,
      credits: prev.credits + amount
    }));

    setTransactions(prev => [...prev, newTransaction]);
  };

  return {
    credits: userCredits.credits,
    transactions,
    canWatchMovie,
    unlockMovie,
    incrementWatchCount,
    getRemainingWatches,
    addCredits,
    UNLOCK_COST,
    MAX_WATCHES
  };
};