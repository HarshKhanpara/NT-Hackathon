export default function HighLowIndicator({ data }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Highest and Lowest Rates</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-semibold">Highest Rate</h3>
          {data.high !== undefined ? (
            <>
              <p>Rate: {data.high.toFixed(4)}</p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h3 className="font-semibold">Lowest Rate</h3>
          {data.low !== undefined ? (
            <>
              <p>Rate: {data.low.toFixed(4)}</p>
            </>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
