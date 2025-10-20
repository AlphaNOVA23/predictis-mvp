import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Alert, Badge, Table } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  const [mockData, setMockData] = useState(null);

  useEffect(() => {
    const mockForecast = [
      { Date: 'Oct 19', Predicted_Admissions: 127 },
      { Date: 'Oct 20', Predicted_Admissions: 139 },
      { Date: 'Oct 21', Predicted_Admissions: 149 },
      { Date: 'Oct 22', Predicted_Admissions: 142 },
      { Date: 'Oct 23', Predicted_Admissions: 130 },
      { Date: 'Oct 24', Predicted_Admissions: 117 },
      { Date: 'Oct 25', Predicted_Admissions: 118 }
    ];

    const mockAdvisory = "ALERT: High patient surge predicted. Proactively call in 3 reserve staff and prepare extra respiratory supplies.";

    setMockData({
      advisory: mockAdvisory,
      forecast: mockForecast
    });
  }, []);

  const renderChart = () => {
    if (!mockData) {
      return <div className="text-center p-5">Loading...</div>;
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={mockData.forecast}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            name="Predicted Admissions"
            dataKey="Predicted_Admissions"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const apiAdvisoryText = mockData ? mockData.advisory : "Loading...";
  const isSurge = apiAdvisoryText.toLowerCase().startsWith('alert');

  return (
    <div>
      <h2 className="mb-4">Predictive Management Dashboard</h2>
      
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

      <Alert variant="danger" className="mb-4">
        <Alert.Heading>CRITICAL ADVISORIES</Alert.Heading>
        <div className="d-flex flex-wrap">
          <Badge pill bg="danger" className="m-1 fs-6">High-level smog predicted for next 48 hours. Respiratory surge expected.</Badge>
          <Badge pill bg="warning" text="dark" className="m-1 fs-6">Diwali festival starting in 3 days. Orthopedic and Burn unit staffing flagged.</Badge>
        </div>
      </Alert>
      
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
                <strong>AI Advisory:</strong> {mockData ? apiAdvisoryText : "Loading..."}
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