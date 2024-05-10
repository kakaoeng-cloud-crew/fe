let currentProject = ''; // 현재 선택된 프로젝트
const baseURL = 'https://virtserver.swaggerhub.com/Victoria-549/test/1.0.0/main';

function openPopup(projectName) {
    currentProject = projectName; // 현재 프로젝트 설정
    document.getElementById('projectTitle').innerText = projectName; // 팝업 제목 설정
    fetch(`${baseURL}/${projectName}`).then(response => {
        if (!response.ok) throw new Error('네트워크 응답 오류');
        return response.json();
    })
    .then(data => {
        document.getElementById('projectInfo').innerText = '프로젝트 정보: ' + JSON.stringify(data);
    })
    .catch(error => document.getElementById('projectInfo').innerText = '오류: ' + error);
    document.getElementById('popup').style.display = 'block'; // 팝업 표시
}

function closePopup() {
    document.getElementById('popup').style.display = 'none'; // 팝업 숨기기
}

async function deleteData(apiEndpoint) {
    try {
        const response = await fetch(`${baseURL}/${apiEndpoint}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        document.getElementById('projectInfo').innerText = '데이터 성공적으로 삭제됨';
    } catch (error) {
        document.getElementById('projectInfo').innerText = '데이터 삭제 오류: ' + error;
    }
}
