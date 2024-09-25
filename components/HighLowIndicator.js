// components/HighLowIndicator.js
// components/HighLowIndicator.js
export default function HighLowIndicator({ data }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Highest and Lowest Rates</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-semibold">Highest Rate</h3>
          {data.high ? (
            <>
              <p>Date: {data.high.date}</p>
              <p>Rate: {data.high.rate}</p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h3 className="font-semibold">Lowest Rate</h3>
          {data.low ? (
            <>
              <p>Date: {data.low.date}</p>
              <p>Rate: {data.low.rate}</p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}