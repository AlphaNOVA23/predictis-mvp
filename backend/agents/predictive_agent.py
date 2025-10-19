import pandas as pd
from sklearn.linear_model import LinearRegression

class PredictiveAgent:
    """
    An agent responsible for training a predictive model and generating forecasts.
    """
    def __init__(self):
        self.model = LinearRegression()

    def generate_forecast(self, historical_df, future_df):
        """
        Trains a linear regression model on historical data and predicts future admissions.
        """
        try:
            # Define features and target
            features = ['AQI_PM25', 'Is_Festival']
            target = 'Daily_Respiratory_Admissions'

            X_train = historical_df[features]
            y_train = historical_df[target]

            # Train the model
            self.model.fit(X_train, y_train)

            # Predict on future data
            X_future = future_df[features]
            future_predictions = self.model.predict(X_future)

            # Create a forecast DataFrame
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
