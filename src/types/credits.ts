export interface UserCredits {
  credits: number;
  unlockedMovies: {
    [movieId: number]: {
      watchCount: number;
      unlockDate: string;
    };
  };
}

export interface CreditTransaction {
  id: string;
  amount: number;
  type: 'debit' | 'credit';
  movieId?: number;
  timestamp: string;
  description: string;
}