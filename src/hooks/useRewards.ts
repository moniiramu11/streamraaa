import { useState, useEffect } from 'react';
import { RewardPoints, PointTransaction } from '../types/rewards';
import { getRewardPoints, getPointTransactions } from '../services/rewardsService';

export const useRewards = () => {
  const [points, setPoints] = useState<RewardPoints>({
    id: '',
    userId: '',
    points: 0,
    createdAt: '',
    updatedAt: '',
  });
  
  const [transactions, setTransactions] = useState<PointTransaction[]>([]);

  useEffect(() => {
    const userId = '1'; // In a real app, get this from auth context
    
    const fetchRewardsData = async () => {
      try {
        const [pointsData, transactionsData] = await Promise.all([
          getRewardPoints(userId),
          getPointTransactions(userId),
        ]);
        
        setPoints(pointsData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error fetching rewards data:', error);
      }
    };

    fetchRewardsData();
  }, []);

  return {
    points,
    transactions,
  };
};