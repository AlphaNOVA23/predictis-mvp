import pandas as pd
import sys

def ingest_data(historical_path: str, future_path: str):
    """
    Reads historical and future data from CSV files into pandas DataFrames.
    Includes robust cleaning and diagnostics.
    """
    try:
        historical_df = pd.read_csv(historical_path, parse_dates=['Date'])
        future_df = pd.read_csv(future_path, parse_dates=['Date'])

        # Clean column names to prevent KeyErrors
        historical_df.columns = historical_df.columns.str.strip()
        future_df.columns = future_df.columns.str.strip()

        return historical_df, future_df
        
    except FileNotFoundError as e:
        # Print error to the server console and return None
        print(f"Error: {e}. Please ensure data files are in the correct directory.", file=sys.stderr)
        return None, None

