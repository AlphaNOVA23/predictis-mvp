import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column vh-100">
        <Header />
        <div className="d-flex flex-grow-1 overflow-hidden">
          <Sidebar />
          <main className="flex-grow-1 p-4 overflow-auto main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/insights" element={<h2>Predictive Insights</h2>} />
              <Route path="/resources" element={<h2>Resource Management</h2>} />
              <Route path="/advisories" element={<h2>Advisories & Comm.</h2>} />
              <Route path="/history" element={<h2>Historical Data</h2>} />
              <Route path="/settings" element={<h2>Settings</h2>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}