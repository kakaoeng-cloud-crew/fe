import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainSB.css';

const baseURL = 'https://virtserver.swaggerhub.com/Victoria-549/test/1.0.0';

interface ProjectInfo {
  title: string; // 가정: API 응답에서 프로젝트의 이름이 'title' 필드에 저장되어 있음
  description: string;
}

interface Project {
  id: string;
  name: string;
}

const MainPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<string>('');
  const [projectInfo, setProjectInfo] = useState<string>('');
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/projects`);
        if (!response.ok) throw new Error('네트워크 응답 오류');
        const jsonResponse = await response.json();
        const projectIds = jsonResponse.projects;
        const projectsData = await Promise.all(
          projectIds.map(async (projectId) => {
            const response = await fetch(`${baseURL}/api/v1/projects/${projectId}`);
            const projectData = await response.json();
            return { id: projectId, name: projectData.title }; // 프로젝트의 'title'을 'name'으로 매핑
          })
        );
        setProjects(projectsData);
      } catch (error) {
        console.error('프로젝트 로딩 실패:', error);
      }
    };

    fetchProjects();
  }, []);

  const openPopup = async (projectId: string) => {
    setCurrentProject(projectId);
    try {
      const response = await fetch(`${baseURL}/api/v1/projects/${projectId}`);
      if (!response.ok) throw new Error(`네트워크 응답 오류: ${response.status}`);
      const data: ProjectInfo = await response.json();
      setProjectInfo('프로젝트 정보: ' + JSON.stringify(data));
      setPopupVisible(true);
    } catch (error) {
      setProjectInfo('오류: ' + error.message);
      setPopupVisible(true);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const deleteData = async () => {
    try {
      const response = await fetch(`${baseURL}/api/v1/projects/${currentProject}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setProjectInfo('데이터 성공적으로 삭제됨');
      setTimeout(() => closePopup(), 2000);
    } catch (error) {
      setProjectInfo('데이터 삭제 오류: ' + error.message);
    }
  };

  const goToCreatePage = () => {
    navigate('/create');
  };

  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <div key={project.id} className="project-box" onClick={() => openPopup(project.id)}>
          {project.id}
        </div>
      ))}

      {popupVisible && (
        <div className="popup" style={{ display: 'block' }}>
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
