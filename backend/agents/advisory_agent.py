import pandas as pd

def generate_advisory(forecast_df: pd.DataFrame, historical_df: pd.DataFrame) -> str:
    """
    Generates a resource advisory based on the forecast.
    
    Args:
        forecast_df (pd.DataFrame): DataFrame with predicted admissions.
        historical_df (pd.DataFrame): DataFrame with historical admissions to calculate the mean.
        
    Returns:
        str: An advisory message. Returns a proactive alert if the surge is significant,
             otherwise indicates that current staffing is adequate.
    """
    if forecast_df.empty or historical_df.empty:
        return "Advisory cannot be generated due to missing data."

    # Calculate the historical average admissions
    historical_mean = historical_df['Daily_Respiratory_Admissions'].mean()
    
    # Find the peak predicted admission in the next 7 days
    peak_forecast = forecast_df['Predicted_Admissions'].max()
    
    # Define the surge threshold (25% above the mean)
    surge_threshold = historical_mean * 1.25
    
    # Simple rule-based advisory
    if peak_forecast > surge_threshold:
        advisory_message = (
            f"ALERT: High patient surge predicted. "
            f"Peak admission forecast is {peak_forecast}, which is "
            f"more than 25% above the historical average of {int(historical_mean)}. "
            f"Recommendation: Proactively call in 3 reserve staff members and ensure "
            f"adequate ventilator and oxygen supply."
        )
    else:
        advisory_message = (
            f"OK: No significant patient surge predicted. "
            f"Peak forecast ({peak_forecast}) is within normal operational limits. "
            f"Recommendation: Maintain standard staffing levels."
        )
        
    return advisory_message
