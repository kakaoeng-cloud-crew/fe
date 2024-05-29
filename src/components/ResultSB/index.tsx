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

const baseURL = 'http://cloudcrew.site';

const ResultSB: React.FC = () => {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error('ProjectContext must be used within a ProjectProvider');
  }

  const { projectId } = context;
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/v1/projects/${projectId}`);
        const data = response.data;
        console.log('API Response:', data);

        if (data) {
          setProjectInfo(data);
        } else {
          setError('프로젝트 데이터를 가져오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('프로젝트 데이터 가져오기 실패:', error);
        setError('프로젝트 데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchProjectData();
  }, [projectId]);

  const copyToClipboard = (text: string) => {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);

    // Select the text
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    try {
      // Copy the text
      document.execCommand('copy');
      alert('주소가 클립보드에 복사되었습니다.');
    } catch (err) {
      console.error('복사 실패:', err);
    }

    // Remove the temporary textarea element
    document.body.removeChild(textarea);
  };

  return (
    <div className="resultsb-wrapper">
      <h1 className="resultsb-title">SB 생성 결과</h1>
      {loading ? (
        <div className="resultsb-loading">로딩 중...</div> // 로딩 중일 때 표시
      ) : error ? (
        <div className="resultsb-error">{error}</div>
      ) : (
        projectInfo && (
          <div className="resultsb-results">
            <h2>도메인 주소:</h2>
            <div className="endpoint-container">
              <input type="text" value={projectInfo.end_point} readOnly className="resultsb-endpoint" />
              <button className="copy-button" onClick={() => copyToClipboard(projectInfo.end_point)}>
                <img src={clipImage} alt="Copy to clipboard" className="clipboard-icon" />
              </button>
            </div>
            {copied && <p>주소가 클립보드에 복사되었습니다.</p>}
            <div>
              {projectInfo.meta_data ? (
                <ul>
                  <li>- 이름: {projectInfo.meta_data.helm_name}</li>
                  <li>- 위치: {projectInfo.meta_data.namespace}</li>
                  <li>- 상태: {projectInfo.meta_data.status}</li>
                  <li>- 리비전: {projectInfo.meta_data.revision}</li>
                  <li>- 차트: {projectInfo.meta_data.chart}</li>
                  <li>- 버전: {projectInfo.meta_data.app_version}</li>
                  <li>- 마지막 수정 날짜: {projectInfo.meta_data.last_deployed}</li>
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
