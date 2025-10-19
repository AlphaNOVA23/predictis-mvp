import numpy as np
import pandas as pd

class PredictiveAgent:
    """
    An agent responsible for training a predictive model and generating forecasts.
    This version uses numpy.linalg.lstsq (Least Squares) to avoid
    the large scikit-learn dependency.
    """
    def __init__(self):
        self.coefficients = None # We will store the model 'c' values here

    def generate_forecast(self, historical_df, future_df):
        """
        Trains a linear regression model on historical data and predicts future admissions
        using numpy for least-squares regression.
        """
        try:
            # Define features and target
            features = ['AQI_PM25', 'Is_Festival']
            target = 'Daily_Respiratory_Admissions'

            # --- Prepare data for numpy ---
            # We need to add a constant "intercept" column (a column of 1s)
            X_train_np = historical_df[features].values
            X_train_with_const = np.c_[np.ones(X_train_np.shape[0]), X_train_np]
            y_train_np = historical_df[target].values

            # --- Train the model (find coefficients) ---
            # This is the numpy equivalent of model.fit()
            # It solves for 'c' in: y = c_0*1 + c_1*x1 + c_2*x2
            self.coefficients, _, _, _ = np.linalg.lstsq(X_train_with_const, y_train_np, rcond=None)

            # --- Prepare future data ---
            X_future_np = future_df[features].values
            X_future_with_const = np.c_[np.ones(X_future_np.shape[0]), X_future_np]
            
            # --- Predict on future data ---
            # This is the numpy equivalent of model.predict()
            # y_pred = c_0*1 + c_1*x1 + c_2*x2
            future_predictions = X_future_with_const.dot(self.coefficients)

            # --- Create a forecast DataFrame ---
            forecast_df = pd.DataFrame({
                'Date': future_df['Date'],
                'Predicted_Admissions': future_predictions
            })
            
            # Ensure predictions are non-negative integers
            forecast_df['Predicted_Admissions'] = forecast_df['Predicted_Admissions'].round().astype(int)
            forecast_df.loc[forecast_df['Predicted_Admissions'] < 0, 'Predicted_Admissions'] = 0

            return forecast_df
            
        except KeyError as e:
            print(f"Error: A required column is missing from the data. {e}")
            return pd.DataFrame()
        except Exception as e:
            print(f"An error occurred during forecast generation: {e}")
            return pd.DataFrame()
