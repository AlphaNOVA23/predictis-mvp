import pandas as pd

def ingest_data(historical_path, future_path):
    """
    Reads historical and future data from CSV files into Pandas DataFrames.
    Includes robust error handling and column name cleaning.
    """
    try:
        historical_df = pd.read_csv(historical_path)
        future_df = pd.read_csv(future_path)

        # Clean column names to prevent KeyErrors from whitespace
        historical_df.columns = historical_df.columns.str.strip()
        future_df.columns = future_df.columns.str.strip()
        
        # Convert 'Date' columns to datetime objects
        historical_df['Date'] = pd.to_datetime(historical_df['Date'])
        future_df['Date'] = pd.to_datetime(future_df['Date'])

        return historical_df, future_df
    except FileNotFoundError as e:
        print(f"Error: Data file not found. {e}")
        return None, None
    except Exception as e:
        print(f"An error occurred during data ingestion: {e}")
        return None, None
