const loginBtn = document.getElementById("loginBtn");
const userId = document.getElementById("userid");
const userPw = document.getElementById("userpw");
const errorMessage = document.getElementById("errorMessage");

// 임시로 가입되어 있다고 가정할 아이디와 비밀번호
const registeredId = "admin";
const registeredPw = "1234";

loginBtn.addEventListener("click", () => {
  
  if (!userId.value || !userPw.value) {
    errorMessage.textContent = "아이디와 비밀번호를 모두 입력해주세요.";
    errorMessage.style.display = "block";
    return;
  }

  if (userId.value !== registeredId || userPw.value !== registeredPw) {
    errorMessage.textContent = "아이디 또는 비밀번호가 잘못되었습니다.";
    errorMessage.style.display = "block";
    return;
  }

 
  errorMessage.style.display = "none";

  window.location.href = "pages/main.html";
});


function handleEnterKey(event) {
    // 누른 키가 'Enter'인지 확인
    if (event.key === 'Enter') {
        loginBtn.click(); 
    }
}

userId.addEventListener('keypress', handleEnterKey);
userPw.addEventListener('keypress', handleEnterKey);