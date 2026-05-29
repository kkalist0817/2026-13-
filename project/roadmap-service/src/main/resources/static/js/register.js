const API_BASE_URL = "/api/v1";

const useridInput = document.getElementById("userid");
const userpwInput = document.getElementById("userpw");
const userpwCheckInput = document.getElementById("userpwCheck");
const registerBtn = document.getElementById("registerBtn");
const errorMessage = document.getElementById("errorMessage");

if (errorMessage) {
  errorMessage.style.display = "none";
}

async function handleRegister() {
  const username = useridInput.value.trim();
  const password = userpwInput.value.trim();
  const passwordCheck = userpwCheckInput.value.trim();

  if (!username || !password || !passwordCheck) {
    showError("아이디와 비밀번호를 모두 입력해주세요.");
    return;
  }

  if (password !== passwordCheck) {
    showError("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
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
      const errorText = await response.text();
      throw new Error(errorText || "회원가입 실패");
    }

    alert("회원가입이 완료되었습니다. 로그인 화면으로 이동합니다.");
    window.location.href = "../login.html";
  } catch (error) {
    console.error("회원가입 오류:", error);
    showError(error.message || "회원가입에 실패했습니다.");
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

registerBtn.addEventListener("click", handleRegister);

userpwCheckInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleRegister();
  }
});