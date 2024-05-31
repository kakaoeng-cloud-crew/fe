import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateSB from './components/CreateSB';
import ResultSB from './components/ResultSB';
import MainSB from './components/MainSB';
import { ProjectProvider } from './context/ProjectContext'; // Import ProjectProvider
import homeIcon from './image/home.png';
import monitoringIcon from './image/monitoring.png'; // Import monitoring icon
import './App.css'; // Ensure the CSS file is imported

function App() {
  return (
    <ProjectProvider>
      <Router>
        <div className="navigation">
          <Link to="/" className="home-link">
            <div className="home-icon">
              <img src={homeIcon} alt="홈" />
            </div>
          </Link>
          <a href="http://monitoring.cloudcrew.site/" className="monitoring-link">
            <div className="monitoring-icon">
              <img src={monitoringIcon} alt="모니터링" />
            </div>
          </a>
        </div>
        <Routes>
          <Route path="/" element={<MainSB />} />
          <Route path="/create" element={<CreateSB />} />
          <Route path="/result" element={<ResultSB />} />
        </Routes>
      </Router>
    </ProjectProvider>
  );
}

export default App;
