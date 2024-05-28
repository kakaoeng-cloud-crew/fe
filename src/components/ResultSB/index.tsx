import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProjectContext } from '../../context/ProjectContext';
import './ResultSB.css';
import clipImage from '../../image/copy.png'; // 이미지 경로를 설정합니다.

function ResultSB() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('ProjectContext must be used within a ProjectProvider');
  }

  const { projectId } = context;
  const [projects, setProjects] = useState({});
  const [domain, setDomain] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`http://3.113.4.45:8000/api/v1/projects/${projectId}`);
        const data = response.data;
        console.log('API Response:', data);

        setDomain(data.end_point);
        setProjects(data.meta_data);
      } catch (error) {
        console.error('프로젝트 데이터 가져오기 실패:', error);
        setError('프로젝트 데이터를 가져오는 데 실패했습니다.');
      }
    };

    fetchProjectData();
  }, [projectId]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(domain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="resultsb-wrapper">
      <h1 className="resultsb-title">SB 생성 결과</h1>
      {error ? (
        <div className="resultsb-error">{error}</div>
      ) : (
        <div className="resultsb-results">
          <h2>
            SB의 도메인 주소: {domain}
            <img src={clipImage} alt="Copy to clipboard" className="clipboard-icon" onClick={handleCopyToClipboard} />
          </h2>
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
      )}
    </div>
  );
}

export default ResultSB;
