import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotificationBanner.css';
import projectIcon from '../../image/project.png'; // 이미지 파일 경로를 올바르게 설정하세요

const NotificationBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/create');
  };

  return (
    <div className="notification-container">
      <h1 className="title">프로젝트</h1>
      <div className="text-and-icon">
        <img src={projectIcon} alt="Project Icon" className="icon-container" />
        <h2>프로젝트가 없습니다!</h2>
        <p>새 프로젝트를 생성하려면 '생성하기'를 클릭하세요.</p>
      </div>
      <button className="create-button" onClick={handleCreateClick}>
        생성하기
      </button>
    </div>
  );
};

export default NotificationBanner;
