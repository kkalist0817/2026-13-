const detailContainer = document.getElementById("detailContainer");

const urlParams = new URLSearchParams(location.search);
const roadmapId = Number(urlParams.get("id"));

let roadmapData = null;
let progressState = {};

function getProgressKey() {
    return `roadmap-progress-${roadmapData.id}`;
}

async function fetchRoadmapDetail() {
    const response = await fetch(`/api/v1/roadmaps/${roadmapId}`, {
        method: "GET",
        credentials: "include"
    });
    if (!response.ok) throw new Error("로드맵 상세 정보를 불러오지 못했습니다.");
    return response.json();
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
        ? roadmapData.weeks[0] : null;

    detailContainer.innerHTML = `
    <div class="detail-card">
      ${renderBaseInfo()}
      ${firstWeek ? `
        <div class="week-section">
          <div class="week-label">${firstWeek.weekNumber}주차</div>
          <div class="checklist-area">
            ${firstWeek.checklists.map(item => `
              <label class="check-item">
                <input type="checkbox" disabled>
                <span>${item.content}</span>
              </label>
            `).join("")}
          </div>
        </div>
      ` : ""}
      <div class="locked-section">
        <div class="lock-icon">🔒</div>
        <div>구매 후 전체 로드맵을 확인할 수 있습니다.</div>
      </div>
      <button class="purchase-button" id="purchaseButton">구매</button>
    </div>
  `;

    document.getElementById("purchaseButton").addEventListener("click", async () => {
        try {
            const response = await fetch("/api/v1/purchases", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ roadmapId: roadmapData.id })
            });
            if (response.status === 401) {
                alert("로그인이 필요합니다.");
                window.location.href = "../login.html";
                return;
            }
            if (!response.ok) {
                alert(await response.text() || "구매에 실패했습니다.");
                return;
            }
            alert("구매가 완료되었습니다.");
            renderPurchasedView();
        } catch (error) {
            console.error("구매 오류:", error);
            alert("구매 중 오류가 발생했습니다.");
        }
    });
}

function renderPurchasedView() {
    detailContainer.innerHTML = `
    <div class="detail-card">
      ${renderBaseInfo()}
      <div class="purchased-badge">구매 완료</div>
      ${roadmapData.weeks && roadmapData.weeks.length > 0
        ? roadmapData.weeks.map(week => `
          <div class="week-section">
            <div class="week-label">${week.weekNumber}주차</div>
            <div class="checklist-area">
              ${week.checklists.map(item => {
            const checked = progressState[item.id] !== undefined
                ? progressState[item.id] : item.completed;
            return `
                  <label class="check-item">
                    <input type="checkbox" class="progress-checkbox"
                      data-id="${item.id}" ${checked ? "checked" : ""}>
                    <span>${item.content}</span>
                  </label>
                `;
        }).join("")}
            </div>
          </div>
        `).join("")
        : `<p>등록된 체크리스트가 없습니다.</p>`
    }
      <div class="save-area">
        <span id="saveMessage"></span>
        <button class="save-button" id="saveProgressButton">저장</button>
      </div>
    </div>
  `;

    document.querySelectorAll(".progress-checkbox").forEach(checkbox => {
        checkbox.addEventListener("change", event => {
            progressState[event.target.dataset.id] = event.target.checked;
        });
    });

    document.getElementById("saveProgressButton").addEventListener("click", () => {
        localStorage.setItem(getProgressKey(), JSON.stringify(progressState));
        const saveMessage = document.getElementById("saveMessage");
        saveMessage.textContent = "저장되었습니다.";
        setTimeout(() => { saveMessage.textContent = ""; }, 1800);
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

        // ✅ 서버에서 구매 여부 확인 (안전하게)
        let isPurchasedFromServer = false;
        try {
            const purchaseResponse = await fetch(`/api/v1/purchases/check?roadmapId=${roadmapId}`, {
                credentials: "include"
            });
            if (purchaseResponse.ok) {
                isPurchasedFromServer = await purchaseResponse.json();
            }
        } catch (e) {
            isPurchasedFromServer = false;
        }

        // ✅ 본인 로드맵 확인 (authorId는 서버 응답에서 옴)
        const currentUserId = Number(localStorage.getItem("userId"));
        const isMyRoadmap = roadmapData.authorId != null && roadmapData.authorId === currentUserId;

        if (isMyRoadmap || isPurchasedFromServer) {
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

initDetailPage();  // ✅ 반드시 있어야 함
