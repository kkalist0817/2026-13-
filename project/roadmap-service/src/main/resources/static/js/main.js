// 1. 임시 데이터 (나중에 백엔드에서 받아올 내 구매 내역 데이터)
const myPurchasedRoadmaps = [
    { id: 1, title: "Toeic: 950점 달성" },
    { id: 2, title: "취업: 00기업 취업" },
    { id: 3, title: "정보처리기사" },
    { id: 4, title: "정보처리기사2" }
];

const addBtn = document.getElementById('addBtn');

function renderRoadmaps() {
    const cardsHtml = myPurchasedRoadmaps.map(roadmap => `
        <button class="roadmap-card" onclick="window.location.href='loadmap-detail.html?id=${roadmap.id}'">
            <div class="card-thumbnail"></div>
            <h3>${roadmap.title}</h3>
            <span style="display:inline-block; margin-top:10px; color:#0f766e; font-weight:bold;">이어서 학습하기 &rarr;</span>
        </button>
    `).join('');

    addBtn.insertAdjacentHTML('beforebegin', cardsHtml);
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