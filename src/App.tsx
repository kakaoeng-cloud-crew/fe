import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateSB from './components/CreateSB';
import ResultSB from './components/ResultSB';
import MainSB from './components/MainSB';
import homeIcon from './image/home.jpg';

function App() {
  return (
    <Router>
      <div className="navigation">
        <Link to="/" className="home-link">
          <img src={homeIcon} alt="홈" className="home-icon" />
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<MainSB />} />
        <Route path="/create" element={<CreateSB />} />
        <Route path="/result" element={<ResultSB />} />
      </Routes>
    </Router>
  );
}

export default App;
