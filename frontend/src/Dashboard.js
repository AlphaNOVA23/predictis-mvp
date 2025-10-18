import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Alert, Table, Badge, Spinner } from 'react-bootstrap';
import { ArrowUp, ArrowDown } from 'react-bootstrap-icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Component for the top KPI cards
const KpiCard = ({ title, value, change, changeType, period }) => {
    const isPositive = changeType === 'positive';
    return (
        <Card className="shadow-sm h-100">
            <Card.Body>
                <Card.Title className="kpi-title">{title}</Card.Title>
                <div className="kpi-value">{value}</div>
                <div className={`kpi-change ${isPositive ? 'text-danger' : 'text-success'}`}>
                    {isPositive ? <ArrowUp /> : <ArrowDown />}{change} <span className="kpi-period">from {period}</span>
                </div>
            </Card.Body>
        </Card>
    );
};

const Dashboard = () => {
    // State for data fetched from backend
    const [forecastData, setForecastData] = useState([]);
    const [apiAdvisory, setApiAdvisory] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // --- THE REAL FIX ---
                // Use a relative path. This works on Vercel (routes via vercel.json)
                // and locally (routes via the new proxy in package.json).
                const response = await fetch('/api/forecast');
                // --- END OF FIX ---

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const formattedData = data.forecast.map(item => ({
                    ...item,
                    Date: new Date(item.Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                }));
                setForecastData(formattedData);
                setApiAdvisory(data.advisory);
            } catch (e) {
                console.error("Fetch error:", e.message);
                setError('Failed to fetch data from backend. The API endpoint might be down or misconfigured on the server.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="dashboard-title mb-4">Predictive Management Dashboard</h1>
            
            {/* KPI Cards Section */}
            <Row className="mb-4">
                <Col md={4}><KpiCard title="Patient Influx" value="452" change="+8% from avg" changeType="positive" period="baseline" /></Col>
                <Col md={4}><KpiCard title="Avg. Wait Time (ER)" value="45 min" change="+12 min" changeType="positive" period="baseline" /></Col>
                <Col md={4}><KpiCard title="Occupancy Rate" value="85%" change="+3% from yesterday" changeType="positive" period="baseline" /></Col>
            </Row>

            {/* Critical Advisories Section */}
            <Alert variant="danger" className="critical-advisories">
                <Alert.Heading>CRITICAL ADVISORIES</Alert.Heading>
                <div className="d-flex flex-wrap">
                    <Badge pill bg="danger" className="advisory-badge">High-level smog predicted for next 48 hours. Respiratory surge expected.</Badge>
                    <Badge pill bg="warning" text="dark" className="advisory-badge">Diwali festival starting in 3 days. Orthopedic and Burn unit staffing flagged.</Badge>
                    <Badge pill bg="info" className="advisory-badge">Server maintenance scheduled for tonight at 2 AM.</Badge>
                </div>
            </Alert>
            
            {/* Main Content: Chart and Recommendations */}
            <Row>
                <Col lg={7}>
                    <Card className="shadow-sm h-100">
                        <Card.Body>
                            <Card.Title>Predicted Patient Surge (Next 7 Days)</Card.Title>
                            {isLoading ? <div className="text-center p-5"><Spinner animation="border" /></div> : error ? <Alert variant="warning">{error}</Alert> : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={forecastData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="Date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="Predicted_Admissions" stroke="#5e81ac" strokeWidth={3} activeDot={{ r: 8 }} name="Predicted Admissions" />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={5}>
                    <Card className="shadow-sm h-100">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <Card.Title>Actionable Recommendations</Card.Title>
                                <a href="#!" className="text-decoration-none">View Roster Adjustments →</a>
                            </div>
                            <Table hover responsive className="recommendation-table mt-3">
                                <thead>
                                    <tr>
                                        <th>Department</th>
                                        <th>Current</th>
                                        <th>Recommended</th>
                                        <th>Change</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Emergency</td><td>12</td><td>15</td><td><Badge bg="danger">+3</Badge></td></tr>
                                    <tr><td>Respiratory ICU</td><td>6</td><td>8</td><td><Badge bg="danger">+2</Badge></td></tr>
                                    <tr><td>General Medicine</td><td>25</td><td>25</td><td><Badge bg="secondary">0</Badge></td></tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

