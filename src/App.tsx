import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import AdminPage from './components/Admin';
import Shop from './components/Shop';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} /> {/* Corrected path */}
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </Router>
  );
};

export default App;
