const detailContainer = document.getElementById("detailContainer");

const urlParams = new URLSearchParams(location.search);
const roadmapId = Number(urlParams.get("id"));

let roadmapData = null;
let progressState = {};

function getProgressKey() {
  return `roadmap-progress-${roadmapData.id}`;
}

function getPurchaseKey() {
  return `roadmap-purchased-${roadmapData.id}`;
}

async function fetchRoadmapDetail() {
  const response = await fetch(`/api/v1/roadmaps/${roadmapId}`, {
    method: "GET",
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("로드맵 상세 정보를 불러오지 못했습니다.");
  }

  return response.json();
}

function isPurchased() {
  return localStorage.getItem(getPurchaseKey()) === "true";
}

function setPurchased() {
  localStorage.setItem(getPurchaseKey(), "true");

  const purchasedListKey = "purchased-roadmap-ids";
  const purchasedIds = JSON.parse(localStorage.getItem(purchasedListKey)) || [];

  if (!purchasedIds.includes(roadmapData.id)) {
    purchasedIds.push(roadmapData.id);
  }

  localStorage.setItem(purchasedListKey, JSON.stringify(purchasedIds));
}

function renderBaseInfo() {
  return `
    <div class="detail-header">
      <h1>${roadmapData.title}</h1>
      <p>${roadmapData.description}</p>

      <div class="roadmap-info">
        <span>기간: ${roadmapData.duration}</span>
        <span>난이도: ${roadmapData.difficulty}</span>
        <span>시작 수준: ${roadmapData.startLevel}</span>
      </div>
    </div>
  `;
}

function renderLockedView() {
  const firstWeek = roadmapData.weeks && roadmapData.weeks.length > 0
    ? roadmapData.weeks[0]
    : null;

  detailContainer.innerHTML = `
    <div class="detail-card">
      ${renderBaseInfo()}

      ${
        firstWeek
          ? `
            <div class="week-section">
              <div class="week-label">${firstWeek.weekNumber}주차</div>
              <div class="checklist-area">
                ${firstWeek.checklists
                  .map((item) => {
                    return `
                      <label class="check-item">
                        <input type="checkbox" disabled>
                        <span>${item.content}</span>
                      </label>
                    `;
                  })
                  .join("")}
              </div>
            </div>
          `
          : ""
      }

      <div class="locked-section">
        <div class="lock-icon">🔒</div>
        <div>구매 후 전체 로드맵을 확인할 수 있습니다.</div>
      </div>

      <button class="purchase-button" id="purchaseButton">구매</button>
    </div>
  `;

  const purchaseButton = document.getElementById("purchaseButton");

  purchaseButton.addEventListener("click", () => {
    alert("구매가 완료되었습니다.");

    setPurchased();
    renderPurchasedView();
  });
}

function renderPurchasedView() {
  detailContainer.innerHTML = `
    <div class="detail-card">
      ${renderBaseInfo()}

      <div class="purchased-badge">구매 완료</div>

      ${
        roadmapData.weeks && roadmapData.weeks.length > 0
          ? roadmapData.weeks
              .map((week) => {
                return `
                  <div class="week-section">
                    <div class="week-label">${week.weekNumber}주차</div>
                    <div class="checklist-area">
                      ${week.checklists
                        .map((item) => {
                          const checked =
                            progressState[item.id] !== undefined
                              ? progressState[item.id]
                              : item.completed;

                          return `
                            <label class="check-item">
                              <input 
                                type="checkbox" 
                                class="progress-checkbox" 
                                data-id="${item.id}" 
                                ${checked ? "checked" : ""}
                              >
                              <span>${item.content}</span>
                            </label>
                          `;
                        })
                        .join("")}
                    </div>
                  </div>
                `;
              })
              .join("")
          : `<p>등록된 체크리스트가 없습니다.</p>`
      }

      <div class="save-area">
        <span id="saveMessage"></span>
        <button class="save-button" id="saveProgressButton">저장</button>
      </div>
    </div>
  `;

  const checkboxes = document.querySelectorAll(".progress-checkbox");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const checklistId = event.target.dataset.id;
      progressState[checklistId] = event.target.checked;
    });
  });

  const saveButton = document.getElementById("saveProgressButton");

  saveButton.addEventListener("click", () => {
    localStorage.setItem(getProgressKey(), JSON.stringify(progressState));

    const saveMessage = document.getElementById("saveMessage");
    saveMessage.textContent = "저장되었습니다.";

    setTimeout(() => {
      saveMessage.textContent = "";
    }, 1800);
  });
}

async function initDetailPage() {
  if (!roadmapId) {
    detailContainer.innerHTML = `
      <div class="detail-card">
        <p>잘못된 접근입니다. 로드맵 ID가 없습니다.</p>
      </div>
    `;
    return;
  }

  try {
    roadmapData = await fetchRoadmapDetail();

    progressState = JSON.parse(localStorage.getItem(getProgressKey())) || {};

    if (isPurchased()) {
      renderPurchasedView();
    } else {
      renderLockedView();
    }
  } catch (error) {
    console.error("상세 페이지 오류:", error);

    detailContainer.innerHTML = `
      <div class="detail-card">
        <p>로드맵 상세 정보를 불러오지 못했습니다.</p>
        <button class="back-button" onclick="history.back()">← 돌아가기</button>
      </div>
    `;
  }
}

initDetailPage();