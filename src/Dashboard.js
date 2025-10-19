import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Spinner, Alert, Badge, Table } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// This is a new helper component for the top KPI cards
const KpiCard = ({ title, value, change, isPositive }) => {
  const changeColor = isPositive ? 'text-danger' : 'text-success';
  return (
    <Card className="shadow-sm h-100">
      <Card.Body>
        <Card.Title className="text-muted" style={{ fontSize: '0.9rem' }}>{title}</Card.Title>
        <h3 className="fw-bold">{value}</h3>
        <span className={changeColor}>{change}</span>
      </Card.Body>
    </Card>
  );
};

export default function Dashboard() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/forecast');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        
        if (result.error) {
          throw new Error(result.error);
        }
        
        const formattedData = result.forecast.map(item => ({
            ...item,
            Date: new Date(item.Date).toLocaleString('en-US', { month: 'short', day: 'numeric' })
        }));
        
        setApiData({ advisory: result.advisory, forecast: formattedData });

      } catch (e) {
        console.error("Fetch error:", e);
        setError(`Failed to fetch data from backend. ${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderChart = () => {
    if (loading) {
      return <div className="text-center p-5"><Spinner animation="border" /></div>;
    }
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }
    if (apiData) {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={apiData.forecast}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" name="Predicted Admissions" dataKey="Predicted_Admissions" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    }
    return null;
  };
  
  const apiAdvisoryText = apiData ? apiData.advisory : "Loading...";
  const isSurge = apiAdvisoryText.toLowerCase().startsWith('alert');

  return (
    <div>
      <h2 className="mb-4">Predictive Management Dashboard</h2>
      
      {/* Static KPI Cards (Restored) */}
      <Row className="mb-4">
        <Col md={4} className="mb-3">
          <KpiCard title="Patient Influx" value="452" change="↑ +8% from baseline" isPositive={true} />
        </Col>
        <Col md={4} className="mb-3">
          <KpiCard title="Avg. Wait Time (ER)" value="45 min" change="↑ +12 min from baseline" isPositive={true} />
        </Col>
        <Col md={4} className="mb-3">
          <KpiCard title="Occupancy Rate" value="85%" change="↑ +3% from yesterday" isPositive={true} />
        </Col>
      </Row>

      {/* Static Critical Advisories (Restored) */}
      <Alert variant="danger" className="mb-4">
        <Alert.Heading>CRITICAL ADVISORIES</Alert.Heading>
        <div className="d-flex flex-wrap">
          <Badge pill bg="danger" className="m-1 fs-6">High-level smog predicted for next 48 hours. Respiratory surge expected.</Badge>
          <Badge pill bg="warning" text="dark" className="m-1 fs-6">Diwali festival starting in 3 days. Orthopedic and Burn unit staffing flagged.</Badge>
        </div>
      </Alert>
      
      {/* API-Driven Content (Combined) */}
      <Row>
        <Col lg={7} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="card-title mb-4">Predicted Patient Surge (Next 7 Days)</h5>
              {renderChart()}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <h5 className="card-title mb-4">Actionable Recommendations (from AI)</h5>
              <Alert variant={isSurge ? 'warning' : 'info'}>
                <strong>AI Advisory:</strong> {loading ? "Loading..." : error ? "N/A" : apiAdvisoryText}
              </Alert>
              <Table hover responsive className="mt-3">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Recommended</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Emergency</td>
                    <td>{isSurge ? 15 : 12}</td>
                    <td><Badge bg={isSurge ? 'danger' : 'secondary'}>{isSurge ? "+3" : "0"}</Badge></td>
                  </tr>
                  <tr>
                    <td>Respiratory ICU</td>
                    <td>{isSurge ? 8 : 6}</td>
                    <td><Badge bg={isSurge ? 'danger' : 'secondary'}>{isSurge ? "+2" : "0"}</Badge></td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
