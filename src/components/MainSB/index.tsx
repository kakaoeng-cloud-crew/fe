import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainSB.css';
import NotificationBanner from './NotificationBanner';

const baseURL = 'http://back-end-service/api/v1/projects';

interface ProjectInfo {
  end_point: string;
  day: string;
  meta_data: string;
}

interface Project {
  id: string;
  project_name: string;
}

interface CurrentProject {
  id: string;
  project_name: string;
}

const MainPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<CurrentProject | null>(null);
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | string>('');
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${baseURL}/api/v1/projects`);
        if (!response.ok) throw new Error('네트워크 응답 오류');
        const projectIds = await response.json();
        const projectsData = await Promise.all(
          projectIds.map(async (projectId: string) => {
            try {
              const response = await fetch(`${baseURL}/api/v1/projects/${projectId}`);
              if (!response.ok) throw new Error('프로젝트 정보 로딩 실패');
              const projectData = await response.json();
              return { id: projectId, project_name: projectData.project_name };
            } catch (error: any) {
              console.error('프로젝트 상세 로딩 실패:', error);
              return { id: projectId, project_name: `${projectId}` };
            }
          })
        );
        setProjects(projectsData);
      } catch (error: any) {
        console.error('프로젝트 로딩 실패:', error);
      }
    };

    fetchProjects();
  }, [refresh]);

  const openPopup = async (project: Project) => {
    setCurrentProject({ id: project.id, project_name: project.project_name });
    try {
      const response = await fetch(`${baseURL}/api/v1/projects/${project.id}`);
      if (!response.ok) throw new Error(`네트워크 응답 오류: ${response.status}`);
      const data: ProjectInfo = await response.json();
      setProjectInfo(data);
      setPopupVisible(true);
    } catch (error: any) {
      setProjectInfo('오류: ' + error.message);
      setPopupVisible(true);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const deleteData = async () => {
    if (!currentProject) return;
    try {
      const response = await fetch(`${baseURL}/api/v1/projects/${currentProject.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      setProjectInfo('데이터 성공적으로 삭제됨');
      setTimeout(() => {
        setPopupVisible(false);
        setRefresh((prev) => !prev);
      }, 2000);
    } catch (error: any) {
      setProjectInfo('데이터 삭제 오류: ' + error.message);
    }
  };

  const goToCreatePage = () => {
    navigate('/create');
  };

  return (
    <div className="projects-container">
      {projects.length === 0 ? (
        <NotificationBanner message="프로젝트가 없습니다." />
      ) : (
        <>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-box" onClick={() => openPopup(project)}>
                {project.project_name}
              </div>
            ))}
          </div>
          <button className="create-button" onClick={goToCreatePage}>
            생성하기
          </button>
        </>
      )}

      {popupVisible && currentProject && (
        <div className="popup" style={{ display: 'block' }}>
          <div className="popup-content" style={{ textAlign: 'center' }}>
            <span className="close-btn" onClick={closePopup}>
              &times;
            </span>
            <h2 style={{ marginBottom: '20px' }}>{currentProject.project_name}</h2>
            {typeof projectInfo === 'string' ? (
              <p>{projectInfo}</p>
            ) : (
              <div>
                <p style={{ marginBottom: '20px' }}>Endpoint: {projectInfo.end_point}</p>
                <p style={{ marginBottom: '20px' }}>Metadata: {projectInfo.meta_data}</p>
                <p style={{ marginBottom: '20px' }}>생성일자: {projectInfo.day}</p>
              </div>
            )}
            <button className="delete-button" onClick={deleteData}>
              프로젝트 삭제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
