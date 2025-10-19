import csv
import numpy as np
from datetime import datetime

def ingest_data(historical_path, future_path):
    try:
        historical_data = []
        with open(historical_path, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                historical_data.append(row)

        future_data = []
        with open(future_path, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                future_data.append(row)

        # --- Process Historical Data ---
        # Clean column names (strip whitespace)
        historical_data = [{k.strip(): v for k, v in row.items()} for row in historical_data]
        
        # Extract columns and convert to numpy arrays
        hist_dates = [datetime.strptime(row['Date'], '%Y-%m-%d') for row in historical_data]
        hist_aqi = np.array([float(row['AQI_PM25']) for row in historical_data])
        hist_festival = np.array([int(row['Is_Festival']) for row in historical_data])
        hist_admissions = np.array([int(row['Daily_Respiratory_Admissions']) for row in historical_data])
        
        # --- Process Future Data ---
        # Clean column names
        future_data = [{k.strip(): v for k, v in row.items()} for row in future_data]
        
        # Extract columns
        future_dates = [datetime.strptime(row['Date'], '%Y-%m-%d') for row in future_data]
        future_aqi = np.array([float(row['AQI_PM25']) for row in future_data])
        future_festival = np.array([int(row['Is_Festival']) for row in future_data])

        # Create structured dictionaries for the other agents
        historical_processed = {
            'dates': hist_dates,
            'features': np.column_stack((hist_aqi, hist_festival)), # A 2D numpy array
            'target': hist_admissions
        }
        
        future_processed = {
            'dates': future_dates,
            'features': np.column_stack((future_aqi, future_festival)) # A 2D numpy array
        }

        return historical_processed, future_processed

    except FileNotFoundError as e:
        print(f"Error: Data file not found. {e}")
        return None, None
    except Exception as e:
        print(f"An error occurred during data ingestion: {e}")
        return None, None