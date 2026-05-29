const API_BASE_URL = "http://localhost:8080/api/v1";

const useridInput = document.getElementById("userid");
const userpwInput = document.getElementById("userpw");
const loginBtn = document.getElementById("loginBtn");
const errorMessage = document.getElementById("errorMessage");

// 처음에는 에러 메시지 숨기기
errorMessage.style.display = "none";

async function handleLogin() {
  const username = useridInput.value.trim();
  const password = userpwInput.value.trim();

  // 입력값 예외 처리
  if (!username || !password) {
    errorMessage.textContent = "아이디와 비밀번호를 모두 입력해주세요.";
    errorMessage.style.display = "block";
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

    errorMessage.style.display = "none";

    alert("로그인에 성공했습니다.");

    // 로그인 성공 후 메인 페이지 이동
    window.location.href = "pages/main.html";
  } catch (error) {
    console.error("로그인 오류:", error);

    errorMessage.textContent = "아이디 또는 비밀번호가 올바르지 않습니다.";
    errorMessage.style.display = "block";
  }
}

loginBtn.addEventListener("click", handleLogin);

userpwInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleLogin();
  }
});