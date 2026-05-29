const mockRoadmaps = [
  {
    id: 1,
    title: "ADsP 3주 단기합격",
    description: "노베이스도 가능한 ADsP 합격 로드맵입니다.",
    duration: "3주",
    difficulty: "중상",
    startLevel: "비전공자"
  },
  {
    id: 2,
    title: "노베이스 ADsP 합격",
    description: "처음 시작하는 사람을 위한 ADsP 로드맵입니다.",
    duration: "4주",
    difficulty: "중",
    startLevel: "초보자"
  },
  {
    id: 3,
    title: "정보처리기사 실기",
    description: "한 달 만에 끝내는 정처기 실기 로드맵입니다.",
    duration: "4주",
    difficulty: "상",
    startLevel: "전공자"
  },
  {
    id: 4,
    title: "TOEIC 950점 달성",
    description: "토익 고득점을 목표로 하는 2개월 집중 로드맵입니다.",
    duration: "2개월",
    difficulty: "상",
    startLevel: "700점 이상"
  }
];

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultContainer = document.getElementById("resultContainer");
const resultCount = document.getElementById("resultCount");

function renderRoadmapCards(roadmaps) {
  resultCount.textContent = `${roadmaps.length}개`;

  if (roadmaps.length === 0) {
    resultContainer.innerHTML = `
      <div class="empty-result">
        <p>검색 결과가 없습니다.</p>
        <span>다른 키워드로 검색해보세요.</span>
      </div>
    `;
    return;
  }

  resultContainer.innerHTML = roadmaps
    .map((roadmap) => {
      return `
        <button class="roadmap-card" data-id="${roadmap.id}">
          <div class="card-thumbnail"></div>
          <h3>${roadmap.title}</h3>
          <p>${roadmap.description}</p>
          <span>${roadmap.duration} · ${roadmap.difficulty} · ${roadmap.startLevel}</span>
        </button>
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

function searchRoadmaps() {
  const keyword = searchInput.value.trim().toLowerCase();

  const filteredRoadmaps = mockRoadmaps.filter((roadmap) => {
    return (
      roadmap.title.toLowerCase().includes(keyword) ||
      roadmap.description.toLowerCase().includes(keyword) ||
      roadmap.duration.toLowerCase().includes(keyword) ||
      roadmap.difficulty.toLowerCase().includes(keyword) ||
      roadmap.startLevel.toLowerCase().includes(keyword)
    );
  });

  renderRoadmapCards(filteredRoadmaps);
}

searchButton.addEventListener("click", searchRoadmaps);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchRoadmaps();
  }
});

const urlParams = new URLSearchParams(location.search);
const initialKeyword = urlParams.get("keyword") || "";

if (initialKeyword) {
  searchInput.value = initialKeyword;
  searchRoadmaps();
} else {
  renderRoadmapCards(mockRoadmaps);
}