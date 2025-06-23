import { RewardPoints, PointTransaction } from '../types/rewards';

// Mock data for demonstration
let mockPoints: RewardPoints = {
  id: '1',
  userId: '1',
  points: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

let mockTransactions: PointTransaction[] = [];

export const getRewardPoints = async (userId: string): Promise<RewardPoints> => {
  return mockPoints;
};

export const getPointTransactions = async (userId: string): Promise<PointTransaction[]> => {
  return mockTransactions;
};

export const awardPoints = async (
  userId: string,
  amount: number,
  type: 'earned' | 'redeemed',
  source: 'recommendation' | 'purchase',
  referenceId: string
): Promise<void> => {
  // Update points
  mockPoints = {
    ...mockPoints,
    points: mockPoints.points + (type === 'earned' ? amount : -amount),
    updatedAt: new Date().toISOString(),
  };

  // Create transaction
  const transaction: PointTransaction = {
    id: Math.random().toString(36).substr(2, 9),
    userId,
    amount,
    type,
    source,
    referenceId,
    createdAt: new Date().toISOString(),
  };

  mockTransactions.push(transaction);
};

export const redeemPointsForDiscount = async (
  userId: string,
  points: number
): Promise<number> => {
  if (points > mockPoints.points) {
    throw new Error('Insufficient points');
  }

  const discountAmount = (points / 100) * 10; // 100 points = Rs 10 discount
  await awardPoints(userId, points, 'redeemed', 'purchase', 'discount');
  
  return discountAmount;
};