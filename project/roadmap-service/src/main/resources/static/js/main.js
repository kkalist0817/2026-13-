// 1. 임시 데이터 (나중에 백엔드에서 받아올 내 구매 내역 데이터)
const PURCHASED_LIST_KEY = "purchased-roadmap-ids";

// 전체 로드맵 목록
// detail.js / search.js의 id와 맞춰야 함
const allRoadmaps = [
  { id: 1, title: "ADsP 3주 단기합격" },
  { id: 2, title: "노베이스 ADsP 합격" },
  { id: 3, title: "정보처리기사 실기" },
  { id: 4, title: "TOEIC 950점 달성" }
];

// 가짜 구매내역 제거
const defaultPurchasedRoadmapIds = [];

function getPurchasedRoadmaps() {
  const savedIds = JSON.parse(localStorage.getItem(PURCHASED_LIST_KEY)) || [];

  const mergedIds = [...new Set([...defaultPurchasedRoadmapIds, ...savedIds])];

  return allRoadmaps.filter((roadmap) => mergedIds.includes(roadmap.id));
}

const addBtn = document.getElementById('addBtn');

function renderRoadmaps() {
  const myPurchasedRoadmaps = getPurchasedRoadmaps();

  if (myPurchasedRoadmaps.length === 0) {
    const emptyHtml = `
      <div class="empty-purchased-message" style="padding: 30px; text-align: center; color: #777;">
        아직 구매한 로드맵이 없습니다.<br>
        원하는 로드맵을 검색하고 구매해보세요!
      </div>
    `;

    addBtn.insertAdjacentHTML("beforebegin", emptyHtml);
    return;
  }

  const cardsHtml = myPurchasedRoadmaps.map(roadmap => `
    <button class="roadmap-card" onclick="window.location.href='loadmap-detail.html?id=${roadmap.id}'">
      <div class="card-thumbnail"></div>
      <h3>${roadmap.title}</h3>
      <span style="display:inline-block; margin-top:10px; color:#0f766e; font-weight:bold;">이어서 학습하기 &rarr;</span>
    </button>
  `).join("");

  addBtn.insertAdjacentHTML("beforebegin", cardsHtml);
}
renderRoadmaps();

addBtn.addEventListener('click', function() {
    window.location.href = 'roadmap-search.html';
});

const mainSearchInput = document.getElementById("mainSearchInput");
const mainSearchButton = document.getElementById("mainSearchButton");

function moveToSearchPage() {
  const keyword = mainSearchInput.value.trim();

  if (!keyword) {
    location.href = "roadmap-search.html";
    return;
  }

  location.href = `roadmap-search.html?keyword=${encodeURIComponent(keyword)}`;
}

if (mainSearchButton && mainSearchInput) {
  mainSearchButton.addEventListener("click", moveToSearchPage);

  mainSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      moveToSearchPage();
    }
  });
}