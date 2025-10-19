import numpy as np

def generate_advisory(forecast_list, historical_data):
    try:
        # Extract data
        historical_mean = np.mean(historical_data['target'])
        
        # Get predictions from the forecast list
        forecast_predictions = np.array([item['Predicted_Admissions'] for item in forecast_list])
        forecast_peak = np.max(forecast_predictions)
        
        # Rule: If the peak forecast is 25% above the historical average, issue an alert.
        if forecast_peak > (historical_mean * 1.25):
            return "ALERT: High patient surge predicted. Proactively call in 3 reserve staff and prepare extra respiratory supplies."
        else:
            return "Normal patient load expected. Standard staffing levels are sufficient."
    except Exception as e:
        print(f"An error occurred during advisory generation: {e}")
        return "Could not generate advisory due to an internal error."