import os
from flask import Flask, jsonify
from flask_cors import CORS
from agents.ingestion_agent import ingest_data
from agents.predictive_agent import PredictiveAgent
from agents.advisory_agent import generate_advisory

# --- Initialize Flask App ---
app = Flask(__name__)
CORS(app)

# --- FIX: Create absolute paths for data files ---
# This ensures the script can find the CSV files in Vercel's environment.
# __file__ is the path to the current script (api.py)
# os.path.dirname gets the directory of that script ('/Backend/')
# os.path.join combines the paths correctly.
_cwd = os.path.dirname(os.path.abspath(__file__))
HISTORICAL_DATA_PATH = os.path.join(_cwd, 'data', 'historical_data.csv')
FUTURE_DATA_PATH = os.path.join(_cwd, 'data', 'future_data.csv')
# --- END OF FIX ---

# --- API Endpoint Definition ---
@app.route('/api/forecast', methods=['GET'])
def get_forecast():
    """
    This endpoint orchestrates the agent workflow and returns the
    forecast and advisory as JSON.
    """
    # 1. Ingestion Agent: Load data using the new absolute paths
    historical_df, future_df = ingest_data(HISTORICAL_DATA_PATH, FUTURE_DATA_PATH)

    if historical_df is None or future_df is None:
        return jsonify({"error": "Failed to load data files from server."}), 500

    # 2. Predictive Agent: Generate forecast
    predictive_agent = PredictiveAgent()
    forecast_df = predictive_agent.generate_forecast(historical_df, future_df)

    if forecast_df.empty:
        return jsonify({"error": "Failed to generate forecast due to data issues."}), 500

    # 3. Advisory Agent: Generate advisory
    advisory_message = generate_advisory(forecast_df, historical_df)

    # 4. Format data for JSON response (React friendly)
    forecast_data = forecast_df.to_dict('records')

    response_payload = {
        "advisory": advisory_message,
        "forecast": forecast_data
    }

    return jsonify(response_payload)
