import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, CreditCard, Loader2, Star, FastForward, Users, Crown, Zap } from 'lucide-react';

interface SubscriptionPageProps {
  onSubscribe: (plan: string) => void;
}

const plans = [
  {
    id: 'starter',
    name: 'Starter Pass',
    price: 49,
    credits: 90,
    bonus: 0,
    icon: FastForward,
    features: [
      
      '1 watch party pass',
      
    ],
    color: 'from-blue-600 to-blue-400'
  },
  {
    id: 'boost',
    name: 'Stream Boost',
    price: 99,
    credits: 200,
    bonus: 10,
    icon: Zap,
    features: [
    
      '3 watch party passes',
  
    ],
    color: 'from-purple-600 to-purple-400',
    popular: true
  },
  {
    id: 'max',
    name: 'CineMax Power Pack',
    price: 199,
    credits: 450,
    bonus: 30,
    icon: Crown,
    features: [
      'Complete ad-free experience',
      'Unlimited watch party passes',
      
    ],
    color: 'from-amber-500 to-amber-300'
  }
];

const SubscriptionPage: React.FC<SubscriptionPageProps> = ({ onSubscribe }) => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>('boost');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    onSubscribe(selectedPlan);
    navigate('/browse');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-[#0f2942] to-blue-950">
      <header className="py-6 px-4">
        <div className="container mx-auto flex items-center">
          <div className="flex items-center">
            <Film className="h-8 w-8 text-blue-400" />
            <span className="ml-2 text-2xl font-bold text-white">
              stream<span className="text-blue-400">ra</span>
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Credit Package
            </h1>
            <p className="text-blue-300 max-w-2xl mx-auto">
              Power up your streaming experience with credits. Unlock movies, join watch parties,
              and enjoy premium features with our flexible plans.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const PlanIcon = plan.icon;
              return (
                <motion.div
                  key={plan.id}
                  className={`relative rounded-2xl ${
                    selectedPlan === plan.id
                      ? 'ring-2 ring-blue-400 transform scale-105'
                      : 'hover:scale-102'
                  } transition-all duration-300`}
                  whileHover={{ scale: selectedPlan === plan.id ? 1.05 : 1.02 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div
                    className={`h-full rounded-2xl p-6 cursor-pointer bg-gradient-to-br ${plan.color} bg-opacity-10 backdrop-blur-lg`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <PlanIcon className="h-8 w-8 text-white" />
                      <div className="text-right">
                        <p className="text-sm text-blue-200">Starting at</p>
                        <p className="text-2xl font-bold text-white">₹{plan.price}</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>

                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-white">{plan.credits}</span>
                        <span className="ml-2 text-blue-200">credits</span>
                      </div>
                      {plan.bonus > 0 && (
                        <p className="text-green-400 text-sm mt-1">
                          +{plan.bonus} bonus credits
                        </p>
                      )}
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-blue-100">
                          <Star className="h-4 w-4 text-blue-400 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full py-3 px-4 rounded-lg transition-colors ${
                        selectedPlan === plan.id
                          ? 'bg-white text-blue-900 font-bold'
                          : 'bg-blue-900/50 text-white hover:bg-blue-800/50'
                      }`}
                    >
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg inline-flex items-center justify-center min-w-[200px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-3" />
                  Processing...
                </div>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Subscribe Now
                </>
              )}
            </button>
            <p className="mt-4 text-blue-300 text-sm">
              Secure payment • Cancel anytime • Instant access
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="py-8 text-center text-blue-400 text-sm">
        <p>&copy; {new Date().getFullYear()} streamra. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SubscriptionPage;