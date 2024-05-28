import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainSB.css';
import NotificationBanner from './NotificationBanner';
import copyIcon from '../../image/copy.png'; // 이미지 파일 경로를 올바르게 지정합니다.

const baseURL = 'http://3.113.4.45:8000';

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
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteMessage, setDeleteMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [valueFileName, setValueFileName] = useState<string | null>(null);
  const [valueFileSize, setValueFileSize] = useState<number | null>(null);
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
              if (!response.ok) throw new Error('프로젝트 정보 로딩 실패!');
              const projectData = await response.json();
              return { id: projectId, project_name: projectData.project_name };
            } catch (error: any) {
              console.error('프로젝트 상세 로딩 실패!:', error);
              return { id: projectId, project_name: `${projectId}` };
            }
          })
        );
        setProjects(projectsData);

        const deleteMessage = localStorage.getItem('deleteMessage');
        if (deleteMessage) {
          setDeleteMessage(deleteMessage);
          localStorage.removeItem('deleteMessage');
          setTimeout(() => {
            setDeleteMessage('');
          }, 2500); // 2.5초 후에 메시지 삭제
        }
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
      setEditFormVisible(false);
    } catch (error: any) {
      setProjectInfo('오류: ' + error.message);
      setPopupVisible(true);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
    setShowConfirmDelete(false);
    setIsDeleting(false);
    setDeleteMessage('');
  };

  const deleteData = async () => {
    if (!currentProject) return;
    setIsDeleting(true);
    setDeleteMessage('데이터 삭제 중');
    try {
      const response = await fetch(`${baseURL}/api/v1/projects/${currentProject.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      localStorage.setItem('deleteMessage', '데이터가 성공적으로 삭제되었습니다!');
      setTimeout(() => {
        setPopupVisible(false);
        setRefresh((prev) => !prev);
        setIsDeleting(false);
        setDeleteMessage('');
      }, 2000);
    } catch (error: any) {
      setDeleteMessage('데이터 삭제 오류: ' + error.message);
      setIsDeleting(false);
    }
  };

  const confirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const goToCreatePage = () => {
    navigate('/create');
  };

  const toggleEditForm = () => {
    setEditFormVisible(!editFormVisible);
  };

  const handleValueFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValueFileName(file.name);
      setValueFileSize(file.size);
    } else {
      setValueFileName(null);
      setValueFileSize(null);
    }
  };

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentProject) return;

    setIsLoading(true);

    const formData = new FormData();
    const fileInput = (event.target as any).values;
    if (fileInput.files[0]) {
      formData.append('values', fileInput.files[0]);
    }

    try {
      const response = await fetch(`${baseURL}/api/v1/projects/${currentProject.id}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const updatedProjectInfo: ProjectInfo = await response.json();
      setProjectInfo(updatedProjectInfo);
      setEditFormVisible(false);
      setIsLoading(false);
    } catch (error: any) {
      console.error('파일 업로드 실패:', error);
      setIsLoading(false);
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return size + ' bytes';
    else if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    else return (size / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('주소가 클립보드에 복사되었습니다.');
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
          <div className="popup-content">
            <span className="close-btn" onClick={closePopup}>
              &times;
            </span>
            <h2 style={{ marginBottom: '20px' }}>{currentProject.project_name}</h2>
            {editFormVisible ? (
              <form onSubmit={handleEditSubmit}>
                <div className="input-group">
                  <div className="label">Value 파일</div>
                  <div className="file-upload-container">
                    <label htmlFor="value-file-upload" className="cursor-pointer">
                      <span className="upload-icon">📂</span>
                      <span className="text-blue-600 hover:text-blue-800">Click to upload or drag and drop</span>
                      <input
                        id="value-file-upload"
                        type="file"
                        className="file-upload-input"
                        onChange={handleValueFileUpload}
                      />
                    </label>
                    <div className="upload-info">
                      <div className="upload-info-text truncate">
                        {valueFileName ? valueFileName : 'values.yaml file'}
                      </div>
                      <div className="upload-info-size">
                        {valueFileSize !== null ? formatFileSize(valueFileSize) : ''}
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="confirm-edit-button">
                  업데이트
                </button>
                {isLoading && <div className="loading-spinner"></div>}
              </form>
            ) : (
              <>
                <div className="endpoint-container">
                  <p className="endpoint-text">Endpoint:</p>
                  <p className="endpoint-url">{(projectInfo as ProjectInfo).end_point}</p>
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard((projectInfo as ProjectInfo).end_point)}
                  >
                    <img src={copyIcon} alt="복사" className="copy-icon" />
                  </button>
                </div>
                <div className="metadata-container">
                  <p>이름: {(projectInfo as ProjectInfo).meta_data.helm_name}</p>
                  <p>위치: {(projectInfo as ProjectInfo).meta_data.namespace}</p>
                  <p>상태: {(projectInfo as ProjectInfo).meta_data.status}</p>
                  <p>리비전: {(projectInfo as ProjectInfo).meta_data.revision}</p>
                  <p>차트: {(projectInfo as ProjectInfo).meta_data.chart}</p>
                  <p>버전: {(projectInfo as ProjectInfo).meta_data.app_version}</p>
                  <p>마지막 수정 날짜: {(projectInfo as ProjectInfo).meta_data.last_deployed}</p>
                </div>
              </>
            )}
            {isDeleting ? (
              <p>데이터 삭제 중...</p>
            ) : showConfirmDelete ? (
              <>
                <p>삭제 하시겠습니까?</p>
                <button className="confirm-delete-button" onClick={deleteData}>
                  예
                </button>
                <button className="cancel-button" onClick={() => setShowConfirmDelete(false)}>
                  아니오
                </button>
              </>
            ) : !editFormVisible ? (
              <>
                <button className="edit-button" onClick={toggleEditForm}>
                  프로젝트 수정하기
                </button>
                <button className="delete-button" onClick={confirmDelete}>
                  프로젝트 삭제하기
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}

      {deleteMessage && !popupVisible && (
        <div className="notification-banner">
          <p>{deleteMessage}</p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
