const API_BASE_URL = "/api/v1";

const useridInput = document.getElementById("userid");
const userpwInput = document.getElementById("userpw");
const loginBtn = document.getElementById("loginBtn");
const errorMessage = document.getElementById("errorMessage");

// 처음에는 에러 메시지 숨기기
if (errorMessage) {
  errorMessage.style.display = "none";
}

async function handleLogin() {
  const username = useridInput.value.trim();
  const password = userpwInput.value.trim();

  if (!username || !password) {
    showError("아이디와 비밀번호를 모두 입력해주세요.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    if (!response.ok) {
      throw new Error("로그인 실패");
    }

    const data = await response.json();
    console.log("로그인 성공:", data);

    localStorage.setItem("userId", data.id);  // ✅ 이 줄 추가

    hideError();

// 로그인 성공 후 메인 화면으로 이동
    window.location.href = "pages/main.html";
  } catch (error) {
    console.error("로그인 오류:", error);
    showError("아이디 또는 비밀번호가 올바르지 않습니다.");
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideError() {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}

loginBtn.addEventListener("click", handleLogin);

userpwInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleLogin();
  }
});
