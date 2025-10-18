from flask import Flask, jsonify
from flask_cors import CORS
from agents.ingestion_agent import ingest_data
from agents.predictive_agent import PredictiveAgent
from agents.advisory_agent import generate_advisory

# --- Initialize Flask App ---
app = Flask(__name__)
# Allow requests from your React app's origin (e.g., http://localhost:3000)
CORS(app)

# --- API Endpoint Definition ---
@app.route('/api/forecast', methods=['GET'])
def get_forecast():
    """
    This endpoint orchestrates the agent workflow and returns the
    forecast and advisory as JSON.
    """
    # 1. Ingestion Agent: Load data
    historical_data_path = 'data/historical_data.csv'
    future_data_path = 'data/future_data.csv'
    historical_df, future_df = ingest_data(historical_data_path, future_data_path)

    if historical_df is None or future_df is None:
        return jsonify({"error": "Failed to load data files."}), 500

    # 2. Predictive Agent: Generate forecast
    predictive_agent = PredictiveAgent()
    forecast_df = predictive_agent.generate_forecast(historical_df, future_df)

    if forecast_df.empty:
        return jsonify({"error": "Failed to generate forecast due to data issues."}), 500

    # 3. Advisory Agent: Generate advisory
    advisory_message = generate_advisory(forecast_df, historical_df)

    # 4. Format data for JSON response (React friendly)
    # Convert dataframe to a list of dictionaries
    forecast_data = forecast_df.to_dict('records')

    # Prepare final JSON payload
    response_payload = {
        "advisory": advisory_message,
        "forecast": forecast_data
    }

    return jsonify(response_payload)

# --- Run the App ---
if __name__ == '__main__':
    # Runs the server on http://127.0.0.1:5000
    app.run(debug=True, port=5000)