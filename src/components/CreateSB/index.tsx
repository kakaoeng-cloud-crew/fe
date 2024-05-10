// components/CreateSB/index.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateSB.css';

function CreateSB() {
  const [projectName, setProjectName] = useState('');
  const [helmFile, setHelmFile] = useState<File | null>(null);
  const [helmFileName, setHelmFileName] = useState<string | null>(null);
  const [helmFileSize, setHelmFileSize] = useState<number | null>(null);
  const [valueFile, setValueFile] = useState<File | null>(null);
  const [valueFileName, setValueFileName] = useState<string | null>(null);
  const [valueFileSize, setValueFileSize] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [projectNameErrorMessage, setProjectNameErrorMessage] = useState<string | null>(null);
  const [fileErrorMessage, setFileErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    else if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    else return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleHelmFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setHelmFile(file);
      setHelmFileName(file.name);
      setHelmFileSize(file.size);
    }
  };

  const handleValueFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setValueFile(file);
      setValueFileName(file.name);
      setValueFileSize(file.size);
    }
  };

  const handleSubmit = () => {
    if (!validateProjectName(projectName)) {
      setProjectNameErrorMessage('프로젝트 이름은 4글자 이상 20글자 이하여야 합니다.');
      return;
    } else {
      setProjectNameErrorMessage(null);
    }

    if (!helmFile || !valueFile) {
      setFileErrorMessage('Helm 파일과 Value 파일을 모두 업로드해 주세요!');
      return;
    } else {
      setFileErrorMessage(null);
    }

    // 성공적으로 프로젝트 생성 시 Result 페이지로 이동
    navigate('/result');
  };

  const validateProjectName = (name: string) => {
    return name.length >= 4 && name.length <= 20;
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">SB 생성하기</h1>
        </div>
        <div className="input-group">
          <label className="label">프로젝트 이름</label>
          <input
            type="text"
            className="input-field"
            placeholder="프로젝트 이름을 입력하세요"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          {projectNameErrorMessage && <div className="invalid-message">{projectNameErrorMessage}</div>}
        </div>
        <div className="input-group">
          <div className="label">Helm 파일</div>
          <div className="file-upload-container">
            <label htmlFor="helm-file-upload" className="cursor-pointer">
              <span className="upload-icon">📂</span>
              <span className="text-blue-600 hover:text-blue-800">Click to upload or drag and drop</span>
              <input id="helm-file-upload" type="file" className="file-upload-input" onChange={handleHelmFileUpload} />
            </label>
            <div className="upload-info">
              <div className="upload-info-text truncate">{helmFileName ? helmFileName : 'template.zip file'}</div>
              <div className="upload-info-size">{helmFileSize !== null ? formatFileSize(helmFileSize) : ''}</div>
            </div>
          </div>
        </div>
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
              <div className="upload-info-text truncate">{valueFileName ? valueFileName : 'values.yaml file'}</div>
              <div className="upload-info-size">{valueFileSize !== null ? formatFileSize(valueFileSize) : ''}</div>
            </div>
          </div>
        </div>
        {fileErrorMessage && <div className="invalid-message">{fileErrorMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="mt-6 text-center">
          <button className="btn-cbt" onClick={handleSubmit}>
            SB 생성하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSB;
