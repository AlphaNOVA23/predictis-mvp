import pandas as pd
from sklearn.linear_model import LinearRegression
import sys

class PredictiveAgent:
    """
    An agent that trains a model and generates forecasts.
    """
    def __init__(self):
        """
        Initializes the PredictiveAgent with a Linear Regression model.
        """
        self.model = LinearRegression()

    def generate_forecast(self, historical_df: pd.DataFrame, future_df: pd.DataFrame) -> pd.DataFrame:
        """
        Trains a linear regression model on historical data and predicts future admissions.
        """
        if historical_df is None or future_df is None:
            return pd.DataFrame()

        features = ['AQI_PM25', 'Is_Festival']
        target = 'Daily_Respiratory_Admissions'
        
        # --- ROBUST FIX with DIAGNOSTICS ---
        try:
            # Verify all required columns exist
            required_cols = features + [target]
            for col in required_cols:
                if col not in historical_df.columns:
                    # Raise a KeyError manually to be caught by our handler
                    raise KeyError(f"Required column '{col}' not found in historical data.")

            X_train = historical_df[features]
            y_train = historical_df[target]

        except KeyError as e:
            # This block will now catch the error and provide a helpful message
            print("\n--- FATAL ERROR in Predictive Agent ---", file=sys.stderr)
            print(f"A required column was not found in your historical_data.csv file.", file=sys.stderr)
            print(f"ERROR: {e}", file=sys.stderr)
            print(f"Columns your code *actually found* are: {historical_df.columns.tolist()}", file=sys.stderr)
            print("\nSOLUTION: Please check for typos or spelling differences in your CSV file's header row.", file=sys.stderr)
            print("---------------------------------------\n", file=sys.stderr)
            # Return an empty dataframe to prevent the app from crashing
            return pd.DataFrame()
        # --- END OF FIX ---
        
        self.model.fit(X_train, y_train)
        
        X_future = future_df[features]
        predictions = self.model.predict(X_future)
        
        forecast_df = future_df.copy()
        forecast_df['Predicted_Admissions'] = predictions.astype(int)
        
        return forecast_df

