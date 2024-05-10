// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import DetailPage from './components/DetailPage/DetailPage';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/details">Details</Link>
        </nav>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/details" element={<DetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
