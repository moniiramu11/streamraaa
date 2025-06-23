import React from 'react';
import { Coins, X } from 'lucide-react';
import { CreditTransaction } from '../types/credits';

interface CreditsModalProps {
  credits: number;
  transactions: CreditTransaction[];
  onClose: () => void;
}

const CreditsModal: React.FC<CreditsModalProps> = ({ credits, transactions, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/90">
      <div className="bg-blue-900 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Coins className="h-6 w-6 text-yellow-400 mr-2" />
            <h2 className="text-2xl font-bold text-white">Your Credits</h2>
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
              <p className="text-blue-300 mb-1">Available Credits</p>
              <h3 className="text-3xl font-bold text-white">{credits}</h3>
            </div>
            <Coins className="h-12 w-12 text-yellow-400" />
          </div>
          <div className="mt-4 text-sm text-blue-300">
            <p>• Unlock any movie or series for 30 credits</p>
            <p>• Create a watch room for 10 credits</p>
            <p>• Earn credits by referring friends</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Transaction History</h3>
          <div className="space-y-4 max-h-60 overflow-y-auto">
            {transactions.map(transaction => (
              <div 
                key={transaction.id}
                className="bg-blue-800/30 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-bold ${
                    transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                  </span>
                  <span className="text-sm text-blue-300">
                    {new Date(transaction.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-white text-sm">{transaction.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsModal;