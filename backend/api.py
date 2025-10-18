import os
import sys
from flask import Flask, jsonify
from flask_cors import CORS

# --- FIX 1: Add the script's directory to the Python path ---
# This ensures that the 'agents' module can be found in Vercel's environment.
_cwd = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, _cwd)
# --- END OF FIX 1 ---

# Now that the path is set, these imports will work reliably.
from agents.ingestion_agent import ingest_data
from agents.predictive_agent import PredictiveAgent
from agents.advisory_agent import generate_advisory

# --- Initialize Flask App ---
app = Flask(__name__)
CORS(app)

# --- FIX 2: Create absolute paths for data files ---
HISTORICAL_DATA_PATH = os.path.join(_cwd, 'data', 'historical_data.csv')
FUTURE_DATA_PATH = os.path.join(_cwd, 'data', 'future_data.csv')
# --- END OF FIX 2 ---

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
