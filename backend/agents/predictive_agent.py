import numpy as np

class PredictiveAgent:
    def __init__(self):
        self.coefficients = None

    def generate_forecast(self, historical_data, future_data):
        try:
            # Extract data from the processed dictionaries
            X_train_np = historical_data['features']
            y_train_np = historical_data['target']
            
            X_future_np = future_data['features']
            future_dates = future_data['dates']

            # Add a constant "intercept" column (a column of 1s)
            X_train_with_const = np.c_[np.ones(X_train_np.shape[0]), X_train_np]
            
            # Train the model (find coefficients)
            self.coefficients, _, _, _ = np.linalg.lstsq(X_train_with_const, y_train_np, rcond=None)

            # Prepare future data
            X_future_with_const = np.c_[np.ones(X_future_np.shape[0]), X_future_np]
            
            # Predict on future data
            future_predictions = X_future_with_const.dot(self.coefficients)
            
            # Round, cast to int, and ensure non-negative
            future_predictions = np.round(future_predictions).astype(int)
            future_predictions[future_predictions < 0] = 0

            # Create a list of dictionaries for the response
            forecast_list = [
                {"Date": date.isoformat(), "Predicted_Admissions": int(pred)}
                for date, pred in zip(future_dates, future_predictions)
            ]

            return forecast_list
            
        except Exception as e:
            print(f"An error occurred during forecast generation: {e}")
            return []