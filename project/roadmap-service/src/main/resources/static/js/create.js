const addWeekBtn = document.getElementById("addWeekBtn");
const weeksContainer = document.getElementById("weeksContainer");
const submitBtn = document.getElementById("submitBtn");

let weekCount = 0;

function updateWeekNumbers() {
  const weekBlocks = document.querySelectorAll(".week-block");

  weekBlocks.forEach((block, index) => {
    const weekNumber = index + 1;
    block.dataset.week = weekNumber;
    block.querySelector(".week-label").textContent = `${weekNumber}주차`;
  });

  weekCount = weekBlocks.length;
}

function createChecklistRow(value = "") {
  return `
    <div class="checklist-row">
      <span class="fake-checkbox">☐</span>
      <input 
        type="text" 
        class="checklist-input" 
        placeholder="체크리스트 항목을 입력하세요"
        value=""
      >
      <button type="button" class="delete-checklist-btn">삭제</button>
    </div>
  `;
}

function createWeekBlock() {
  weekCount++;

  const weekHtml = `
    <div class="week-block" data-week="${weekCount}">
      <div class="week-header">
        <span class="week-label">${weekCount}주차</span>
        <button type="button" class="delete-week-btn">주차 삭제</button>
      </div>

      <div class="checklist-container">
        ${createChecklistRow()}
      </div>

      <button type="button" class="add-checklist-btn">+ 체크리스트 추가</button>
    </div>
  `;

  weeksContainer.insertAdjacentHTML("beforeend", weekHtml);
}

addWeekBtn.addEventListener("click", () => {
  createWeekBlock();
});

weeksContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-week-btn")) {
    event.target.closest(".week-block").remove();
    updateWeekNumbers();
  }

  if (event.target.classList.contains("add-checklist-btn")) {
    const weekBlock = event.target.closest(".week-block");
    const checklistContainer = weekBlock.querySelector(".checklist-container");
    checklistContainer.insertAdjacentHTML("beforeend", createChecklistRow());
  }

  if (event.target.classList.contains("delete-checklist-btn")) {
    const weekBlock = event.target.closest(".week-block");
    const checklistRows = weekBlock.querySelectorAll(".checklist-row");

    if (checklistRows.length === 1) {
      alert("각 주차에는 최소 1개의 체크리스트가 필요합니다.");
      return;
    }

    event.target.closest(".checklist-row").remove();
  }
});

submitBtn.addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const duration = document.getElementById("duration").value.trim();
  const difficulty = document.getElementById("difficulty").value.trim();
  const startLevel = document.getElementById("startLevel").value.trim();

  if (!title || !description || !duration || !difficulty || !startLevel) {
    alert("로드맵의 기본 정보를 모두 입력해주세요.");
    return;
  }

  const weekBlocks = document.querySelectorAll(".week-block");

  if (weekBlocks.length === 0) {
    alert("최소 1개 이상의 주차를 추가해주세요.");
    return;
  }

  const weeks = [];

  for (let i = 0; i < weekBlocks.length; i++) {
    const weekBlock = weekBlocks[i];
    const checklistInputs = weekBlock.querySelectorAll(".checklist-input");

    const checklists = Array.from(checklistInputs)
      .map((input) => input.value.trim())
      .filter((value) => value.length > 0);

    if (checklists.length === 0) {
      alert(`${i + 1}주차에 체크리스트를 1개 이상 입력해주세요.`);
      return;
    }

    weeks.push({
      weekNumber: i + 1,
      checklists: checklists
    });
  }

  const requestData = {
    title,
    description,
    duration,
    difficulty,
    startLevel,
    weeks
  };

  console.log("로드맵 생성 요청 데이터:", requestData);

  try {
    const response = await fetch("/api/v1/roadmaps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(requestData)
    });

    if (response.status === 401) {
      alert("로그인이 필요합니다. 다시 로그인해주세요.");
      window.location.href = "../login.html";
      return;
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "로드맵 생성 실패");
    }

    alert("로드맵 생성이 완료되었습니다.");

    // 생성 완료 후 메인 화면으로 이동
    window.location.href = "main.html";
  } catch (error) {
    console.error("로드맵 생성 오류:", error);
    alert("로드맵 생성 중 오류가 발생했습니다.");
  }
});

// 처음 화면에 1주차 기본 생성
createWeekBlock();