import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ProjectContext } from '../../context/ProjectContext';
import './ResultSB.css';
import clipImage from '../../image/copy.png'; // 이미지 경로를 설정합니다.

interface MetaData {
  helm_name: string;
  last_deployed: string;
  namespace: string;
  status: string;
  revision: number;
  chart: string;
  app_version: string;
}

interface ProjectInfo {
  end_point: string;
  day: string;
  meta_data: MetaData;
}

const baseURL = 'http://3.113.4.45:8000';

const ResultSB: React.FC = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('ProjectContext must be used within a ProjectProvider');
  }

  const { projectId } = context;
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/v1/projects/${projectId}`);
        const data = response.data;
        console.log('API Response:', data);

        setProjectInfo(data);
      } catch (error) {
        console.error('프로젝트 데이터 가져오기 실패:', error);
        setError('프로젝트 데이터를 가져오는 데 실패했습니다.');
      }
    };

    fetchProjectData();
  }, [projectId]);

  const handleCopyToClipboard = () => {
    if (projectInfo) {
      navigator.clipboard.writeText(projectInfo.end_point);
      setCopied(true);
      alert('주소가 클립보드에 복사되었습니다.'); // alert 창 추가
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="resultsb-wrapper">
      <h1 className="resultsb-title">SB 생성 결과</h1>
      {error ? (
        <div className="resultsb-error">{error}</div>
      ) : (
        projectInfo && (
          <div className="resultsb-results">
            <h2>
              도메인 주소: {projectInfo.end_point}
              <img src={clipImage} alt="Copy to clipboard" className="clipboard-icon" onClick={handleCopyToClipboard} />
            </h2>
            <div>
              <h3>SB 메타데이터:</h3>
              {projectInfo.meta_data ? (
                <ul>
                  <li>- 이름: {projectInfo.meta_data.helm_name}</li>
                  <li>- 마지막 수정 날짜: {projectInfo.meta_data.last_deployed}</li>
                  <li>- 위치: {projectInfo.meta_data.namespace}</li>
                  <li>- 상태: {projectInfo.meta_data.status}</li>
                  <li>- 리비전: {projectInfo.meta_data.revision}</li>
                  <li>- 차트: {projectInfo.meta_data.chart}</li>
                  <li>- 버전: {projectInfo.meta_data.app_version}</li>
                </ul>
              ) : (
                <p>메타데이터가 없습니다.</p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ResultSB;
