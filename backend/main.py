import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Add the current directory to the Python path
_cwd = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, _cwd)

from agents.ingestion_agent import ingest_data
from agents.predictive_agent import PredictiveAgent
from agents.advisory_agent import generate_advisory

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data File Paths ---
HISTORICAL_DATA_PATH = os.path.join(_cwd, 'data', 'historical_data.csv')
FUTURE_DATA_PATH = os.path.join(_cwd, 'data', 'future_data.csv')


@app.get("/api/forecast")
def get_forecast():
    """
    Orchestrates the agent workflow without pandas.
    """
    historical_data, future_data = ingest_data(HISTORICAL_DATA_PATH, FUTURE_DATA_PATH)
    if historical_data is None or future_data is None:
        return {"error": "Failed to load data files on server."}

    predictive_agent = PredictiveAgent()
    forecast_list = predictive_agent.generate_forecast(historical_data, future_data)
    if not forecast_list:
        return {"error": "Failed to generate forecast."}

    advisory_message = generate_advisory(forecast_list, historical_data)

    return {
        "advisory": advisory_message,
        "forecast": forecast_list  # This is now a list of dicts
    }