const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultContainer = document.getElementById("resultContainer");
const resultCount = document.getElementById("resultCount");

function renderRoadmapCards(roadmaps) {
  resultCount.textContent = `${roadmaps.length}개`;

  if (roadmaps.length === 0) {
    resultContainer.innerHTML = `
      <div class="empty-result">
        <h3>검색 결과가 없습니다.</h3>
        <p>다른 키워드로 검색해보세요.</p>
      </div>
    `;
    return;
  }

  resultContainer.innerHTML = roadmaps
    .map((roadmap) => {
      return `
        <div class="roadmap-card" data-id="${roadmap.id}">
          <h3>${roadmap.title}</h3>
          <p>${roadmap.description}</p>
          <span>${roadmap.duration} · ${roadmap.difficulty} · ${roadmap.startLevel}</span>
        </div>
      `;
    })
    .join("");

  const cards = document.querySelectorAll(".roadmap-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const roadmapId = card.dataset.id;
      location.href = `loadmap-detail.html?id=${roadmapId}`;
    });
  });
}

async function fetchAllRoadmaps() {
  const response = await fetch("/api/v1/roadmaps", {
    method: "GET",
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("전체 로드맵 조회 실패");
  }

  return response.json();
}

async function fetchSearchRoadmaps(keyword) {
  const response = await fetch(`/api/v1/roadmaps/search?keyword=${encodeURIComponent(keyword)}`, {
    method: "GET",
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("로드맵 검색 실패");
  }

  return response.json();
}

async function searchRoadmaps() {
  const keyword = searchInput.value.trim();

  try {
    const roadmaps = keyword
      ? await fetchSearchRoadmaps(keyword)
      : await fetchAllRoadmaps();

    renderRoadmapCards(roadmaps);
  } catch (error) {
    console.error("검색 API 오류:", error);
    resultCount.textContent = "0개";
    resultContainer.innerHTML = `
      <div class="empty-result">
        <h3>로드맵을 불러오지 못했습니다.</h3>
        <p>잠시 후 다시 시도해주세요.</p>
      </div>
    `;
  }
}

searchButton.addEventListener("click", searchRoadmaps);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchRoadmaps();
  }
});

async function initSearchPage() {
  const urlParams = new URLSearchParams(location.search);
  const initialKeyword = urlParams.get("keyword") || "";

  if (initialKeyword) {
    searchInput.value = initialKeyword;
  }

  await searchRoadmaps();
}

initSearchPage();