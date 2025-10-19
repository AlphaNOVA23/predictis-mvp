import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Add the current directory to the Python path to ensure agents can be found
_cwd = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, _cwd)

# Now that the path is set, these imports will work reliably.
from agents.ingestion_agent import ingest_data
from agents.predictive_agent import PredictiveAgent
from agents.advisory_agent import generate_advisory

app = FastAPI()

# --- Middleware for CORS (for local development) ---
# This allows your local React app (on port 3000) to talk to this backend (on port 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Data File Paths ---
# Create absolute paths to ensure Vercel can find the data files.
HISTORICAL_DATA_PATH = os.path.join(_cwd, 'data', 'historical_data.csv')
FUTURE_DATA_PATH = os.path.join(_cwd, 'data', 'future_data.csv')


@app.get("/api/forecast")
def get_forecast():
    """
    This endpoint orchestrates the agent workflow and returns the
    forecast and advisory as JSON.
    """
    historical_df, future_df = ingest_data(HISTORICAL_DATA_PATH, FUTURE_DATA_PATH)
    if historical_df is None or future_df is None:
        return {"error": "Failed to load data files on server."}

    predictive_agent = PredictiveAgent()
    forecast_df = predictive_agent.generate_forecast(historical_df, future_df)
    if forecast_df.empty:
        return {"error": "Failed to generate forecast."}

    advisory_message = generate_advisory(forecast_df, historical_df)
    forecast_data = forecast_df.to_dict('records')

    return {
        "advisory": advisory_message,
        "forecast": forecast_data
    }
