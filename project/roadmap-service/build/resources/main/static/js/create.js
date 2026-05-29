const addWeekBtn = document.getElementById('addWeekBtn');
const weeksContainer = document.getElementById('weeksContainer');
const submitBtn = document.getElementById('submitBtn');

let weekCount = 0;

// --- 🌟 주차 번호 재정렬 함수 ---
function updateWeekNumbers() {
    const blocks = document.querySelectorAll('.week-block');
    weekCount = blocks.length; 
    
    blocks.forEach((block, index) => {
        const newNum = index + 1;
        block.id = `week-${newNum}`;
        // 새 디자인에 맞춰 클래스명을 .week-label로 변경
        block.querySelector('.week-label').innerText = `${newNum}주차`;
    });
}

weeksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-week-btn')) {
        e.target.closest('.week-block').remove();
        updateWeekNumbers();
    }
});

// 1. [+ 주차 추가] 버튼 클릭 로직
addWeekBtn.addEventListener('click', () => {
    if (weekCount > 0) {
        const lastWeekInput = document.querySelector(`#week-${weekCount} .task-input`);
        const rawArray = lastWeekInput.value.split(',').map(item => item.trim());
        
        if (rawArray.includes("")) {
            alert(`${weekCount}주차 할 일을 정확히 입력해주십시오. (불필요한 쉼표나 빈 항목 불가)`);
            lastWeekInput.focus();
            return; 
        }
    }

    weekCount++;
    
    // 새 디자인이 적용된 주차별 입력 폼
    const weekHtml = `
        <div class="week-block" id="week-${weekCount}" style="margin-top: 16px; padding: 18px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div class="week-label" style="margin:0; font-weight:bold; background:#e2e8f0; padding:8px 12px; border-radius:8px;">${weekCount}주차</div>
                <button type="button" class="delete-week-btn" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: bold;">삭제</button>
            </div>
            <input type="text" class="task-input" placeholder="할 일을 쉼표(,)로 구분해 적어주십시오." style="width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 14px;">
        </div>
    `;
    weeksContainer.insertAdjacentHTML('beforeend', weekHtml);
});

// 2. [로드맵 생성 완료] 버튼 클릭 로직
submitBtn.addEventListener('click', () => {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const duration = document.getElementById('duration').value.trim();
    const difficulty = document.getElementById('difficulty').value.trim();
    const startLevel = document.getElementById('startLevel').value.trim();

    if (!title || !description || !duration || !difficulty || !startLevel) {
        alert("로드맵의 모든 기본 정보를 빠짐없이 입력해주십시오.");
        return;
    }

    if (weekCount === 0) {
        alert("최소 1주차 이상의 학습 과정을 추가해주십시오.");
        return;
    }

    const weeksData = [];
    const weekBlocks = document.querySelectorAll('.week-block');
    
    for (let i = 0; i < weekBlocks.length; i++) {
        const block = weekBlocks[i];
        const weekNum = i + 1;
        const taskInput = block.querySelector('.task-input');
        
        const rawArray = taskInput.value.split(',').map(item => item.trim());
        
        if (rawArray.includes("")) {
            alert(`${weekNum}주차의 할 일을 정확히 입력해주십시오. (불필요한 쉼표나 빈 항목 불가)`);
            taskInput.focus();
            return;
        }

        weeksData.push({
            weekNumber: weekNum,
            checklists: rawArray
        });
    }

    const requestData = {
        title: title,
        description: description,
        duration: duration,
        difficulty: difficulty,
        startLevel: startLevel,
        weeks: weeksData
    };

    console.log("백엔드로 보낼 준비 완료!", requestData);
    alert("로드맵 생성이 완료되었습니다.");

    window.location.href = 'main.html';
});