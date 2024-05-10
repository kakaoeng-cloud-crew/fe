import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainSB.css'; // CSS 파일 이름 확인 필요

const baseURL = 'https://virtserver.swaggerhub.com/Victoria-549/test/1.0.0/main';

interface ProjectInfo {
  title: string;
  description: string;
}

const MainPage: React.FC = () => {
  const [currentProject, setCurrentProject] = useState<string>('');
  const [projectInfo, setProjectInfo] = useState<string>('');
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const openPopup = async (projectName: string) => {
    setCurrentProject(projectName);
    try {
      const response = await fetch(`${baseURL}/${projectName}`);
      if (!response.ok) throw new Error(`네트워크 응답 오류: ${response.status}`);
      const data: ProjectInfo = await response.json();
      setProjectInfo('프로젝트 정보: ' + JSON.stringify(data));
      setPopupVisible(true); // 상태 업데이트 확인
    } catch (error) {
      setProjectInfo('오류: ' + error.message);
      setPopupVisible(true); // 오류가 발생해도 팝업을 보여주기
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const deleteData = async () => {
    try {
      const response = await fetch(`${baseURL}/${currentProject}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setProjectInfo('데이터 성공적으로 삭제됨');
      setTimeout(() => closePopup(), 2000); // 데이터 삭제 후 자동으로 팝업을 닫기
    } catch (error) {
      setProjectInfo('데이터 삭제 오류: ' + error.message);
    }
  };

  const goToCreatePage = () => {
    navigate('/create');
  };

  return (
    <div className="projects-grid">
      {['Project1', 'Project2', 'Project3', 'Project4'].map((project) => (
        <div key={project} className="project-box" onClick={() => openPopup(project)}>
          {project}
        </div>
      ))}

      {popupVisible && (
        <div className="popup" style={{ display: 'block' }}>
          {' '}
          <div className="popup-content">
            <span className="close-btn" onClick={closePopup}>
              &times;
            </span>
            <h2>{currentProject}</h2>
            <p>{projectInfo}</p>
            <button onClick={deleteData}>데이터 삭제하기</button>
          </div>
        </div>
      )}

      <button className="create-button" onClick={goToCreatePage}>
        생성하기
      </button>
    </div>
  );
};

export default MainPage;
