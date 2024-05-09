import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateSB.css';

function CreateSB() {
  const [helmFileName, setHelmFileName] = useState<string | null>(null);
  const [helmFileSize, setHelmFileSize] = useState<number | null>(null);
  const [valueFileName, setValueFileName] = useState<string | null>(null);
  const [valueFileSize, setValueFileSize] = useState<number | null>(null);
  const navigate = useNavigate();

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleHelmFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setHelmFileName(file.name);
      setHelmFileSize(file.size);
    }
  };

  const handleValueFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setValueFileName(file.name);
      setValueFileSize(file.size);
    }
  };

  const handleSubmit = () => {
    navigate('/result-sb');
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">SB 생성하기</h1>
        </div>
        <div className="input-group">
          <label className="label">Project name</label>
          <input type="text" className="input-field" placeholder="project 이름을 입력하세요" />
        </div>
        <div className="input-group">
          <div className="label">Helm file</div>
          <div className="file-upload-container">
            <label htmlFor="helm-file-upload" className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-800">
                Click to upload or drag and drop
              </span>
              <input
                id="helm-file-upload"
                type="file"
                className="file-upload-input"
                onChange={handleHelmFileUpload}
              />
            </label>
            <div className="upload-info">
              <div className="upload-info-text truncate">
                {helmFileName ? helmFileName : 'template file'}
              </div>
              <div className="upload-info-size">
                {helmFileSize !== null ? formatFileSize(helmFileSize) : ''}
              </div>
            </div>
          </div>
        </div>
        <div className="input-group">
          <div className="label">Value file</div>
          <div className="file-upload-container">
            <label htmlFor="value-file-upload" className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-800">
                Click to upload or drag and drop
              </span>
              <input
                id="value-file-upload"
                type="file"
                className="file-upload-input"
                onChange={handleValueFileUpload}
              />
            </label>
            <div className="upload-info">
              <div className="upload-info-text truncate">
                {valueFileName ? valueFileName : 'project values.yaml file'}
              </div>
              <div className="upload-info-size">
                {valueFileSize !== null ? formatFileSize(valueFileSize) : ''}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button className="btn-cbt" onClick={handleSubmit}>SB 생성하기</button>
        </div>
      </div>
    </div>
  );
}

export default CreateSB;