import { useState, useEffect } from 'react';

export default function RiskIndicator({ currency1, currency2, duration }) {
  const [riskLevel, setRiskLevel] = useState('');

  useEffect(() => {
    calculateRiskLevel(currency1, currency2, duration);
  }, [currency1, currency2, duration]);

  const calculateRiskLevel = async (cur1, cur2, dur) => {
    // Simulate an API call to calculate the risk level
    const levels = ['Low', 'Medium', 'High'];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    setRiskLevel(randomLevel);
  };

  return (
    <div className="mb-8 p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Risk Indicator</h2>
      <p className="text-gray-700 text-lg">
        The current risk level for 
        <span className="font-bold ml-1">{currency1}/{currency2}</span> 
        over the <span className="font-bold ml-1">{duration}</span> period is:
        <span 
          className={`font-bold ml-2 px-3 py-1 rounded ${
            riskLevel === 'Low' ? 'bg-green-100 text-green-600' : 
            riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 
            'bg-red-100 text-red-600'
          }`}
        >
          {riskLevel}
        </span>
      </p>
    </div>
  );
}
