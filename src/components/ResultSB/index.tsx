import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ResultSB.css';

function ResultSB() {
  const [progress, setProgress] = useState(69);
  const [isComplete, setIsComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [projects, setProjects] = useState([]);
  const [domain, setDomain] = useState('www.test.com');

  useEffect(() => {
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
  }, []);

  const handleCloseModal = () => {
    setIsComplete(false);
    setShowResults(true);
  };

  // 데이터를 가져오는 함수
  const fetchProjectData = async () => {
    try {
      const response = await axios.get('https://virtserver.swaggerhub.com/Victoria-549/test/1.0.0/main');
      const data = response.data;

      if (data.success) {
        setProjects(data.projects);
        setDomain('www.test.com'); // 실제 데이터로 변경 필요
      }
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
              {projects.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
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
