import { useState } from "react";

export default function CustomBasketManager() {
  const [baskets, setBaskets] = useState([]);
  const [newBasket, setNewBasket] = useState({ name: '', currencies: [] });
  const [baseCurrency, setBaseCurrency] = useState('USD');

  const addCurrencyToBasket = (currency, weight) => {
    setNewBasket(prev => ({
      ...prev,
      currencies: [...prev.currencies, { currency, weight }]
    }));
  };

  const saveBasket = () => {
    setBaskets(prev => [...prev, newBasket]);
    setNewBasket({ name: '', currencies: [] });
  };

  const calculateBasketValue = (basket) => {
    return 1000; // Placeholder value for demonstration purposes
  };

  return (
    <div className="mb-8 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Custom Currency Baskets</h2>
      
      {/* Basket Name Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Basket Name"
          value={newBasket.name}
          onChange={(e) => setNewBasket(prev => ({ ...prev, name: e.target.value }))}
          className="p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-2"
        />
        <button
          onClick={saveBasket}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Save Basket
        </button>
      </div>
      
      {/* Add Currency to Basket */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          placeholder="Currency"
          className="p-3 w-1/3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mr-4"
        />
        <input
          type="number"
          placeholder="Weight"
          className="p-3 w-1/3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mr-4"
        />
        <button
          onClick={() => addCurrencyToBasket('USD', 50)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Add to Basket
        </button>
      </div>
      
      {/* Display Saved Baskets */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-600">Saved Baskets</h3>
        {baskets.length > 0 ? (
          baskets.map((basket, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg mb-4 shadow-sm">
              <span className="font-semibold text-gray-700">{basket.name}: </span>
              <span className="text-gray-600">{calculateBasketValue(basket)} {baseCurrency}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No baskets saved yet.</p>
        )}
      </div>
    </div>
  );
}
