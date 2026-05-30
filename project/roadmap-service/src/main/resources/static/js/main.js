// 1. 임시 데이터 (나중에 백엔드에서 받아올 내 구매 내역 데이터)
const PURCHASED_LIST_KEY = "purchased-roadmap-ids";

const addBtn = document.getElementById('addBtn');

// 백엔드에서 내 구매 내역 가져오기
async function getPurchasedRoadmaps() {
  try {
    const response = await fetch("/api/v1/users/me/purchases", {
      method: "GET",
      credentials: "include"
    });

    if (!response.ok) return [];

    return response.json();
  } catch (error) {
    console.error("구매 내역 조회 실패:", error);
    return [];
  }
}

async function renderRoadmaps() {
  const myPurchasedRoadmaps = await getPurchasedRoadmaps();

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
        <div class="roadmap-card-content">
            <h3>${roadmap.title}</h3>
            <span class="roadmap-link">이어서 학습하기 &rarr;</span>
        </div>
    </button>
  `).join('');

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
