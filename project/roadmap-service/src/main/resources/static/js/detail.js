const detailDataList = [
  {
    id: 1,
    title: "ADsP 3주 단기합격",
    description: "노베이스도 가능한 ADsP 합격 로드맵입니다.",
    duration: "3주",
    difficulty: "중상",
    startLevel: "비전공자",
    isPurchased: false,
    weeks: [
      {
        weekNumber: 1,
        checklists: [
          { id: 101, content: "1과목 adapter 강의", completed: false },
          { id: 102, content: "개념문제풀이", completed: true }
        ]
      },
      {
        weekNumber: 2,
        checklists: [
          { id: 201, content: "2과목 adapter 강의", completed: false },
          { id: 202, content: "개념문제풀이", completed: false }
        ]
      },
      {
        weekNumber: 3,
        checklists: [
          { id: 301, content: "3과목 adapter 강의", completed: false },
          { id: 302, content: "개념문제풀이", completed: false }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "노베이스 ADsP 합격",
    description: "처음 시작하는 사람을 위한 ADsP 로드맵입니다.",
    duration: "4주",
    difficulty: "중",
    startLevel: "초보자",
    isPurchased: false,
    weeks: [
      {
        weekNumber: 1,
        checklists: [
          { id: 401, content: "데이터 분석 기초 개념 정리", completed: false },
          { id: 402, content: "시험 범위 확인", completed: false }
        ]
      },
      {
        weekNumber: 2,
        checklists: [
          { id: 501, content: "1과목 핵심 이론 학습", completed: false },
          { id: 502, content: "단원별 문제 풀이", completed: false }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "정보처리기사 실기",
    description: "한 달 만에 끝내는 정처기 실기 로드맵입니다.",
    duration: "4주",
    difficulty: "상",
    startLevel: "전공자",
    isPurchased: true,
    weeks: [
      {
        weekNumber: 1,
        checklists: [
          { id: 601, content: "디자인 패턴 암기", completed: false },
          { id: 602, content: "SQL 기본 문법 정리", completed: false }
        ]
      },
      {
        weekNumber: 2,
        checklists: [
          { id: 603, content: "프로그래밍 문제 풀이", completed: false },
          { id: 604, content: "기출 1회 풀이", completed: false }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "TOEIC 950점 달성",
    description: "토익 고득점을 목표로 하는 2개월 집중 로드맵입니다.",
    duration: "2개월",
    difficulty: "상",
    startLevel: "700점 이상",
    isPurchased: true,
    weeks: [
      {
        weekNumber: 1,
        checklists: [
          { id: 701, content: "기본 실력 진단 테스트", completed: false },
          { id: 702, content: "LC Part 3 문제 풀이", completed: false }
        ]
      },
      {
        weekNumber: 2,
        checklists: [
          { id: 703, content: "RC 문법 빈출 유형 정리", completed: false },
          { id: 704, content: "실전 모의고사 1회", completed: false }
        ]
      }
    ]
  }
];

const detailContainer = document.getElementById("detailContainer");

const urlParams = new URLSearchParams(location.search);
const roadmapId = Number(urlParams.get("id")) || 1;

const mockDetailData =
  detailDataList.find((roadmap) => roadmap.id === roadmapId) || detailDataList[0];

const PROGRESS_KEY = `roadmap-progress-${mockDetailData.id}`;
const PURCHASE_KEY = `roadmap-purchased-${mockDetailData.id}`;

const savedPurchased = localStorage.getItem(PURCHASE_KEY) === "true";

mockDetailData.isPurchased = mockDetailData.isPurchased || savedPurchased;

let progressState = JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};

function renderDetailPage() {
  if (mockDetailData.isPurchased) {
    renderPurchasedView();
  } else {
    renderLockedView();
  }
}

function renderBaseInfo() {
  return `
    <div class="detail-header">
      <h1>${mockDetailData.title}</h1>
      <p>${mockDetailData.description}</p>

      <div class="roadmap-info">
        <span>기간: ${mockDetailData.duration}</span>
        <span>난이도: ${mockDetailData.difficulty}</span>
        <span>시작 수준: ${mockDetailData.startLevel}</span>
      </div>
    </div>
  `;
}

function renderLockedView() {
  const firstWeek = mockDetailData.weeks[0];

  detailContainer.innerHTML = `
    ${renderBaseInfo()}

    <div class="week-section">
      <button class="week-label">${firstWeek.weekNumber}주차</button>

      <div class="checklist-area">
        ${firstWeek.checklists
          .map((item) => {
            return `
              <label class="check-item">
                <input type="checkbox" disabled ${item.completed ? "checked" : ""} />
                ${item.content}
              </label>
            `;
          })
          .join("")}
      </div>
    </div>

    <div class="locked-section">
      <div class="lock-icon">🔒</div>
      <p>구매 후 전체 로드맵을 확인할 수 있습니다.</p>
    </div>

    <button id="purchaseButton" class="purchase-button">구매</button>
  `;

  const purchaseButton = document.getElementById("purchaseButton");

purchaseButton.addEventListener("click", () => {
  alert("구매가 완료되었습니다.");

  localStorage.setItem(PURCHASE_KEY, "true");

  const PURCHASED_LIST_KEY = "purchased-roadmap-ids";

  const purchasedIds =
    JSON.parse(localStorage.getItem(PURCHASED_LIST_KEY)) || [];

  if (!purchasedIds.includes(mockDetailData.id)) {
    purchasedIds.push(mockDetailData.id);
  }

  localStorage.setItem(PURCHASED_LIST_KEY, JSON.stringify(purchasedIds));

  mockDetailData.isPurchased = true;

  renderPurchasedView();
});

}

function renderPurchasedView() {
  detailContainer.innerHTML = `
    ${renderBaseInfo()}

    <div class="purchased-badge">구매 완료</div>

    ${mockDetailData.weeks
      .map((week) => {
        return `
          <div class="week-section">
            <button class="week-label">${week.weekNumber}주차</button>

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
                      />
                      ${item.content}
                    </label>
                  `;
                })
                .join("")}
            </div>
          </div>
        `;
      })
      .join("")}

    <div class="save-area">
      <span id="saveMessage"></span>
      <button id="saveProgressButton" class="save-button">저장</button>
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
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressState));

    const saveMessage = document.getElementById("saveMessage");
    saveMessage.textContent = "저장되었습니다.";

    setTimeout(() => {
      saveMessage.textContent = "";
    }, 1800);
  });
}

renderDetailPage();