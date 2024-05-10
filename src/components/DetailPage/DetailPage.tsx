// src/DetailPage.tsx
import React from 'react';

const DetailPage: React.FC = () => {
  return (
    <div style={{ border: '2px solid black', padding: '20px' }}>
      <h1>Detail Page</h1>
      <button onClick={() => alert("Detail Clicked!")}>More Details</button>
    </div>
  );
}

export default DetailPage;
