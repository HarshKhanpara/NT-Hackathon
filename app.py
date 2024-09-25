import base64

import matplotlib

matplotlib.use('Agg')  # Use non-interactive backend
import io
import logging

import matplotlib.pyplot as plt
import pandas as pd
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS

# Configure logging
#logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

data = pd.read_csv(r'C:\Users\Gaurav\OneDrive\Desktop\NT-Hackathon1\NT-Hackathon\merge-csv.com__66f42a380ef8d.csv')
data.columns = data.columns.str.strip()
data['Date'] = pd.to_datetime(data['Date'], format='%d-%b-%y', errors='coerce')
data.dropna(subset=['Date'], inplace=True)

@app.route('/exchange-rate-chart', methods=['POST'])
def exchange_rate_chart():
    logging.debug("Received request to generate exchange rate chart")
    
    req_data = request.get_json()
    currency1 = req_data.get('currency1')
    currency2 = req_data.get('currency2')
    duration = req_data.get('duration', 'weekly').lower()  # Convert to lower case

    # Check if the requested currencies exist in the dataset
    if currency1 not in data.columns or currency2 not in data.columns:
        logging.error(f'Invalid currency selection: {currency1}, {currency2}')
        return jsonify({'error': f'Invalid currency selection: {currency1}, {currency2}'}), 400

    # Prepare the data
    selected_data = data[['Date', currency1, currency2]].copy()
    selected_data[currency1] = pd.to_numeric(selected_data[currency1], errors='coerce')
    selected_data[currency2] = pd.to_numeric(selected_data[currency2], errors='coerce')
    selected_data.dropna(inplace=True)

    # Calculate the exchange rate
    selected_data['Exchange_Rate'] = selected_data[currency1] / selected_data[currency2]
    selected_data.set_index('Date', inplace=True)

    # Resample the data based on the selected duration
    if duration == 'weekly':
        trend = selected_data['Exchange_Rate'].resample('W').mean()
    elif duration == 'monthly':
        trend = selected_data['Exchange_Rate'].resample('M').mean()
    elif duration == 'quarterly':
        trend = selected_data['Exchange_Rate'].resample('Q').mean()
    elif duration == 'yearly':
        trend = selected_data['Exchange_Rate'].resample('Y').mean()
    else:
        logging.error(f'Invalid duration: {duration}')
        return jsonify({'error': f'Invalid duration: {duration}'}), 400

    # Calculate high and low values
    highest_rate = trend.max()
    lowest_rate = trend.min()

    # Plot the graph
    plt.figure(figsize=(10, 6))
    plt.plot(trend.index, trend, marker='o')
    plt.title(f'{duration.capitalize()} {currency1} to {currency2} Trend')
    plt.xlabel('Date')
    plt.ylabel(f'{currency1}/{currency2}')
    plt.grid(True)

    # Save the plot to a BytesIO object
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plt.close()

    logging.debug("Plot saved successfully")

    # Encode the image to base64
    img_base64 = base64.b64encode(img.getvalue()).decode('utf-8')

    # Return the image and high/low values as JSON
    return jsonify({
        'image': img_base64,
        'highRate': highest_rate,
        'lowRate': lowest_rate,
    })

if __name__ == '__main__':
    app.run(debug=True)

