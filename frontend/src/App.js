import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Layout Components
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import './App.css'; 

// Placeholder pages for the new routes
const Placeholder = ({ title }) => <div className="p-4"><h2>{title}</h2><p>Future content will be displayed here.</p></div>;

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content-area">
          <Sidebar />
          <div className="dashboard-content">
            <Routes>
              {/* Main Dashboard Route */}
              <Route path="/" element={<Dashboard />} /> 
              <Route path="/dashboard" element={<Dashboard />} /> 
              
              {/* Define placeholder routes for other pages */}
              <Route path="/insights" element={<Placeholder title="Predictive Insights" />} />
              <Route path="/resources" element={<Placeholder title="Resource Management" />} />
              <Route path="/advisories" element={<Placeholder title="Advisories & Comm." />} />
              <Route path="/history" element={<Placeholder title="Historical Data" />} />
              <Route path="/settings" element={<Placeholder title="Settings" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

