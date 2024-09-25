// "use client";

// // pages/index.js
// import { useState, useEffect } from 'react';
// import axios from 'axios'; // Import axios for making HTTP requests
// import CurrencySelector from '../components/CurrencySelector';
// import DurationSelector from '../components/DurationSelector';
// import ExchangeRateChart from '../components/ExchangeRateChart';
// import HighLowIndicator from '../components/HighLowIndicator';
// import CustomBasketManager from '../components/CustomBasketManager';
// import RiskIndicator from '../components/RiskIndicator';
// import PuffLoader from "react-spinners/PuffLoader"; // Modern loading spinner
// import { generateMockData } from '@/utils/generateMockData';

// export default function Home() {
//   const [currency1, setCurrency1] = useState('USD');
//   const [currency2, setCurrency2] = useState('EUR');
//   const [duration, setDuration] = useState('weekly');
//   const [exchangeRateData, setExchangeRateData] = useState([]);
//   const [highLowData, setHighLowData] = useState({ high: null, low: null });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchExchangeRateData(currency1, currency2, duration);
//   }, [currency1, currency2, duration]);

//   const fetchExchangeRateData = async (cur1, cur2, dur) => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = generateMockData(dur);
//       const data = response.data;
//       console.log(data);

//       // Filter data based on selected currencies and duration
//       const filteredData = data.filter(item => item.currency1 === cur1 && item.currency2 === cur2);
//       const rates = filteredData.map(item => ({ date: item.date, rate: item.rate }));

//       // Calculate high and low rates
//       const high = rates.reduce((max, item) => (item.rate > max.rate ? item : max), rates[0]);
//       const low = rates.reduce((min, item) => (item.rate < min.rate ? item : min), rates[0]);

//       setExchangeRateData(rates);
//       setHighLowData({ high, low });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-4xl">
//       <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Currency Exchange Dashboard</h1>
      
//       {/* Currency and Duration Selectors */}
//       <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <CurrencySelector
//             label="Currency 1"
//             value={currency1}
//             onChange={setCurrency1}
//             className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
//           />
//           <CurrencySelector
//             label="Currency 2"
//             value={currency2}
//             onChange={setCurrency2}
//             className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
//           />
//         </div>
//         <DurationSelector
//           value={duration}
//           onChange={setDuration}
//           className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
//         />
//       </div>

//       {/* Loading and Error States */}
//       {isLoading ? (
//         <div className="flex justify-center items-center py-8">
//           <PuffLoader size={60} color="#4F46E5" />
//         </div>
//       ) : error ? (
//         <p className="text-red-500 text-center">{error}</p>
//       ) : (
//         <div className="grid gap-6">
          
//           {/* Exchange Rate Chart */}
//           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-lg shadow-md text-white">
//             <ExchangeRateChart data={exchangeRateData} />
//           </div>

//           {/* High/Low Indicator */}
//           <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//             <HighLowIndicator data={highLowData} />
//           </div>

//           {/* Custom Basket Manager */}
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <CustomBasketManager />
//           </div>

//           {/* Risk Indicator */}
//           <div className="bg-white shadow-md rounded-lg p-6">
//             <RiskIndicator currency1={currency1} currency2={currency2} duration={duration} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// app/exchange-rate/page.js
import { useState } from 'react';
import axios from 'axios';

export default function ExchangeRatePage() {
    const [currency1, setCurrency1] = useState('');
    const [currency2, setCurrency2] = useState('');
    const [duration, setDuration] = useState('weekly');
    const [image, setImage] = useState('');
    const [highRate, setHighRate] = useState(null);
    const [lowRate, setLowRate] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors
        try {
            const response = await axios.post('http://localhost:5000/exchange-rate-chart', {
                currency1,
                currency2,
                duration
            });

            setImage(response.data.image);
            setHighRate(response.data.highRate);
            setLowRate(response.data.lowRate);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-6">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Exchange Rate Chart</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 mb-6 max-w-md w-full border border-gray-300 transition-transform transform hover:scale-105">
                <div className="mb-6">
                    <label className="block text-gray-800 text-sm font-medium mb-2" htmlFor="currency1">
                        Currency 1
                    </label>
                    <input
                        type="text"
                        id="currency1"
                        value={currency1}
                        onChange={(e) => setCurrency1(e.target.value)}
                        className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                        placeholder="e.g., USD"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-800 text-sm font-medium mb-2" htmlFor="currency2">
                        Currency 2
                    </label>
                    <input
                        type="text"
                        id="currency2"
                        value={currency2}
                        onChange={(e) => setCurrency2(e.target.value)}
                        className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                        placeholder="e.g., EUR"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-800 text-sm font-medium mb-2" htmlFor="duration">
                        Duration
                    </label>
                    <select
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
                    >
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Generate Chart
                    </button>
                </div>
                {error && <p className="text-red-600 mt-4 text-sm font-semibold">{error}</p>}
            </form>

            {image && (
                <div className="mt-8 bg-white shadow-xl rounded-lg p-6 max-w-md w-full border border-gray-300 transition-transform transform hover:scale-105">
                    <h2 className="text-lg font-semibold text-gray-800">Exchange Rate Chart</h2>
                    <img src={`data:image/png;base64,${image}`} alt="Exchange Rate Chart" className="mt-4 rounded-lg shadow-md" />
                    <div className="mt-4">
                        <p className="font-bold text-gray-700">Highest Rate: <span className="text-blue-600">{highRate}</span></p>
                        <p className="font-bold text-gray-700">Lowest Rate: <span className="text-blue-600">{lowRate}</span></p>
                    </div>
                </div>
            )}
        </div>
    );
}
