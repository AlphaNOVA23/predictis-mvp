import React from 'react';
import ReactDOM from 'react-dom/client';

// Import bootstrap CSS first to allow custom styles to override it
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);