"use client";

import { useState, useEffect } from 'react';
import CurrencySelector from '../components/CurrencySelector';
import DurationSelector from '../components/DurationSelector';
import ExchangeRateChart from '../components/ExchangeRateChart';
import HighLowIndicator from '../components/HighLowIndicator';
import CustomBasketManager from '../components/CustomBasketManager';
import RiskIndicator from '../components/RiskIndicator';
import { generateMockData } from '../utils/generateMockData';
import PuffLoader from "react-spinners/PuffLoader"; // Modern loading spinner

export default function Home() {
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');
  const [duration, setDuration] = useState('weekly');
  const [exchangeRateData, setExchangeRateData] = useState([]);
  const [highLowData, setHighLowData] = useState({ high: null, low: null });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExchangeRateData(currency1, currency2, duration);
  }, [currency1, currency2, duration]);

  const fetchExchangeRateData = async (cur1, cur2, dur) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = generateMockData(dur);
      setExchangeRateData(data.rates);
      setHighLowData({
        high: data.high,
        low: data.low
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Currency Exchange Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <CurrencySelector
            label="Currency 1"
            value={currency1}
            onChange={setCurrency1}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
          <CurrencySelector
            label="Currency 2"
            value={currency2}
            onChange={setCurrency2}
            className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <DurationSelector
          value={duration}
          onChange={setDuration}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <PuffLoader size={60} color="#4F46E5" />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid gap-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-lg shadow-md text-white">
            <ExchangeRateChart data={exchangeRateData} />
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <HighLowIndicator data={highLowData} />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <CustomBasketManager />
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <RiskIndicator currency1={currency1} currency2={currency2} duration={duration} />
          </div>
        </div>
      )}
    </div>
  );
}
