export default function HighLowIndicator({ data }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Highest and Lowest Rates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Highest Rate</h3>
          {data.high ? (
            <div>
              <p className="text-gray-600">Date: <span className="font-medium">{data.high.date}</span></p>
              <p className="text-gray-600">Rate: <span className="font-medium">{data.high.rate}</span></p>
            </div>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>

        <div className="bg-red-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Lowest Rate</h3>
          {data.low ? (
            <div>
              <p className="text-gray-600">Date: <span className="font-medium">{data.low.date}</span></p>
              <p className="text-gray-600">Rate: <span className="font-medium">{data.low.rate}</span></p>
            </div>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
