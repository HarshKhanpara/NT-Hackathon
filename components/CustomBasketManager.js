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
    // This function would typically make an API call to get current exchange rates
    // and calculate the basket value. For now, we'll return a placeholder value.
    return 1000; // Placeholder value
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Custom Currency Baskets</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Basket Name"
          value={newBasket.name}
          onChange={(e) => setNewBasket(prev => ({ ...prev, name: e.target.value }))}
          className="p-2 border rounded mr-2"
        />
        <button onClick={saveBasket} className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Basket
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Currency"
          className="p-2 border rounded mr-2"
        />
        <input
          type="number"
          placeholder="Weight"
          className="p-2 border rounded mr-2"
        />
        <button onClick={() => addCurrencyToBasket('USD', 50)} className="bg-green-500 text-white px-4 py-2 rounded">
          Add to Basket
        </button>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Saved Baskets</h3>
        {baskets.map((basket, index) => (
          <div key={index} className="mb-2">
            <span>{basket.name}: </span>
            <span>{calculateBasketValue(basket)} {baseCurrency}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

