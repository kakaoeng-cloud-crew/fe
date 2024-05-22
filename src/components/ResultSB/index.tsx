import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProjectContext } from '../../context/ProjectContext';
import './ResultSB.css';

function ResultSB() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('ProjectContext must be used within a ProjectProvider');
  }

  const { projectId } = context;
  const [progress, setProgress] = useState(50);
  const [isComplete, setIsComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [projects, setProjects] = useState({});
  const [domain, setDomain] = useState('');

  useEffect(() => {
    console.log('Project ID:', projectId);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          setIsComplete(true);
          clearInterval(interval);
        }
        return next <= 100 ? next : prev;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [projectId]);

  const handleCloseModal = () => {
    setIsComplete(false);
    setShowResults(true);
  };

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(`http://18.182.6.40:8000/api/v1/projects/${projectId}`);
      const data = response.data;
      console.log('API Response:', data);

      setDomain(data.end_point);
      setProjects(data.meta_data);
    } catch (error) {
      console.error('프로젝트 데이터 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    if (showResults) {
      fetchProjectData();
    }
  }, [showResults]);

  return (
    <div className="resultsb-wrapper">
      <h1 className="resultsb-title">SB 생성하기</h1>
      {showResults ? (
        <div className="resultsb-results">
          <h2>SB의 도메인 주소: {domain}</h2>
          <div>
            <h3>SB 메타데이터:</h3>
            <ul>
              {Object.entries(projects).map(([key, value], index) => {
                const displayValue = Array.isArray(value) ? value.join(', ') : value != null ? value.toString() : '';
                return (
                  <li key={index}>
                    {key}: {displayValue}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="resultsb-box">
          <div className="resultsb-circle-wrapper">
            <svg className="resultsb-progress-circle" viewBox="0 0 36 36">
              <path
                className="resultsb-progress-circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="resultsb-progress-circle-fg"
                strokeDasharray={`${progress}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="resultsb-percentage">{progress}%</span>
          </div>
          <div className="resultsb-text">SB가 생성중 입니다</div>
        </div>
      )}

      {isComplete && (
        <div className="resultsb-modal">
          <div className="resultsb-modal-content">
            <h2>SB가 생성되었습니다</h2>
            <button onClick={handleCloseModal}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultSB;
