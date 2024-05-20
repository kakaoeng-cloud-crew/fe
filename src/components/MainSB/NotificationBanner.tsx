import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 임포트합니다.
import './NotificationBanner.css';

const NotificationBanner: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용합니다.

  const handleCreateClick = () => {
    console.log('생성하기 버튼 클릭');
    navigate('/create'); // '/create' 경로로 이동합니다.
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="banner">
        <div className="exclamation-circle">
          <div className="exclamation-mark">!</div>
        </div>
        <span>프로젝트가 없습니다. 프로젝트를 생성해주세요!</span>
      </div>
      <div className="bottom-buttons">
        <button className="create-button" onClick={handleCreateClick}>
          생성하기
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;
