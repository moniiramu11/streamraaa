export interface RewardPoints {
  id: string;
  userId: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface PointTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earned' | 'redeemed';
  source: 'recommendation' | 'purchase';
  referenceId: string;
  createdAt: string;
}