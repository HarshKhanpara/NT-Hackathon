import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse'; // To parse CSV files, install with `npm install papaparse`

// Helper function to fill missing data
const fillMissingData = (data) => {
  const filledData = data.map((row) => {
    Object.keys(row).forEach((key) => {
      if (row[key] === '') {
        row[key] = null;
      }
    });
    return row;
  });

  // Forward fill null values
  for (let i = 1; i < filledData.length; i++) {
    Object.keys(filledData[i]).forEach((key) => {
      if (!filledData[i][key]) {
        filledData[i][key] = filledData[i - 1][key];
      }
    });
  }

  return filledData;
};

// Function to load the CSV data and return it
const loadCSV = (year) => {
  const filePath = path.join(process.cwd(), `public/data/Exchange_Rate_Report_${year}.csv`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  // Parse the CSV
  let data = [];
  Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
    complete: (result) => {
      data = result.data;
    },
  });

  // Fill missing data
  return fillMissingData(data);
};

// The main API handler
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fromCurrency = searchParams.get('from');
  const toCurrency = searchParams.get('to');
  const year = searchParams.get('year') || '2021';

  const data = loadCSV(year);

  // Perform conversion calculation based on the selected currencies
  const fromRates = data.map(row => parseFloat(row[fromCurrency]));
  const toRates = data.map(row => parseFloat(row[toCurrency]));
  const conversionRate = toRates[0] / fromRates[0];

  return NextResponse.json({ conversionRate });
}
