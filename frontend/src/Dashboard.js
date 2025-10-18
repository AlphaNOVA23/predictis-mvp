import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// --- FIX: Removed the 'react-bootstrap-icons' import that was causing the build to fail ---

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // This relative path works on Vercel and with the local proxy
        const response = await fetch('/api/forecast');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        // Format the date for better chart readability
        const formattedData = result.forecast.map(item => ({
            ...item,
            Date: new Date(item.Date).toLocaleString('en-US', { month: 'short', day: 'numeric' })
        }));
        
        setData({ advisory: result.advisory, forecast: formattedData });

      } catch (e) {
        console.error("Fetch error:", e);
        setError("Failed to fetch data from backend. The API endpoint might be down or misconfigured on the server.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <div className="text-center p-5"><Spinner animation="border" /></div>;
    }

    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }

    if (data) {
      const { advisory, forecast } = data;
      const isSurge = advisory.toLowerCase().startsWith('alert');
      const lastDayPrediction = forecast[forecast.length - 1].Predicted_Admissions;

      return (
        <>
          <Row className="mb-4">
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Actionable Advisory</Card.Title>
                  <Card.Text className={`fw-bold ${isSurge ? 'text-danger' : 'text-success'}`}>
                    {advisory}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Peak 7-Day Forecast</Card.Title>
                  <h3 className="fw-bold">{Math.round(lastDayPrediction)} Admissions</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>Trend vs. Historical Avg.</Card.Title>
                  {/* --- FIX: Replaced icons with simple text --- */}
                  <h3 className={`fw-bold ${isSurge ? 'text-danger' : 'text-success'}`}>
                    {isSurge ? 'Surge Expected' : 'Normal'}
                  </h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card className="shadow-sm">
                <Card.Body>
                  <h5 className="card-title mb-4">Predicted Patient Surge (Next 7 Days)</h5>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={forecast}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Predicted_Admissions" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      );
    }
    return null;
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
}