// src/MainPage.tsx
import React from 'react';

const MainPage: React.FC = () => {
  return (
    <div style={{ border: '2px solid black', padding: '20px' }}>
      <h1>Main Page</h1>
      <button onClick={() => alert("Clicked!")}>Click Me</button>
    </div>
  );
}

export default MainPage;
