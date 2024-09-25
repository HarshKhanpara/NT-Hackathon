// components/RiskIndicator.js
import { useState, useEffect } from 'react';

export default function RiskIndicator({ currency1, currency2, duration }) {
  const [riskLevel, setRiskLevel] = useState('');

  useEffect(() => {
    calculateRiskLevel(currency1, currency2, duration);
  }, [currency1, currency2, duration]);

  const calculateRiskLevel = async (cur1, cur2, dur) => {
    // This function would typically make an API call to calculate the risk level
    // based on historical volatility. For now, we'll set a random risk level.
    const levels = ['Low', 'Medium', 'High'];
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    setRiskLevel(randomLevel);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Risk Indicator</h2>
      <p>
        The current risk level for {currency1}/{currency2} over the {duration} period is:
        <span className={`font-bold ml-2 ${
          riskLevel === 'Low' ? 'text-green-500' :
          riskLevel === 'Medium' ? 'text-yellow-500' : 'text-red-500'
        }`}>
          {riskLevel}
        </span>
      </p>
    </div>
  );
}