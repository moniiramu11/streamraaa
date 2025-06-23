import React from 'react';
import { Gift, X, Ticket } from 'lucide-react';
import { RewardPoints, PointTransaction } from '../types/rewards';

interface RewardsModalProps {
  points: RewardPoints;
  transactions: PointTransaction[];
  onClose: () => void;
}

const RewardsModal: React.FC<RewardsModalProps> = ({ points, transactions, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/90">
      <div className="bg-blue-900 rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Gift className="h-6 w-6 text-blue-400 mr-2" />
            <h2 className="text-2xl font-bold text-white">Your Rewards</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-blue-300 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-blue-800/50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 mb-1">Available Points</p>
              <h3 className="text-3xl font-bold text-white">{points.points}</h3>
            </div>
            <Ticket className="h-12 w-12 text-blue-400" />
          </div>
          <div className="mt-4 text-sm text-blue-300">
            <p>• Earn 100 points for each friend who watches your recommended movies</p>
            <p>• Redeem points for discounts on products in our Shop</p>
            <p>• 100 points = Rs 10 discount</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Points History</h3>
          <div className="space-y-4">
            {transactions.map(transaction => (
              <div 
                key={transaction.id}
                className="bg-blue-800/30 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-white font-medium">
                    {transaction.type === 'earned' ? 'Earned Points' : 'Redeemed Points'}
                  </p>
                  <p className="text-sm text-blue-300">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={`text-lg font-bold ${
                  transaction.type === 'earned' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsModal;