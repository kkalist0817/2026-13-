# 📚 Roadmap Service - 백엔드 API 서버

학습 로드맵을 생성, 검색, 구매하고 진도를 관리하는 서비스의 백엔드 API 서버입니다.

---

## 🌐 배포 주소
Railway 배포 URL:
https://2026-13-production.up.railway.app/login.html

로컬 실행: `http://localhost:8080/login.html`

---

## 🛠 기술 스택

| 항목 | 내용 |
|------|------|
| Language | Java 17 |
| Framework | Spring Boot 4.0.6 |
| Database | MySQL 8.0 (Railway 클라우드) |
| ORM | Spring Data JPA / Hibernate |
| Security | Spring Security |
| Build Tool | Gradle |
| Deploy | Railway (Docker 기반 자동 배포) |

---

## 📁 프로젝트 구조

```
src/
└── main/
    ├── java/
    │   └── com/roadmap/service/
    │       ├── config/                  # 설정 파일
    │       │   ├── CorsConfig.java      # CORS 설정
    │       │   └── SecurityConfig.java  # Spring Security 설정
    │       │
    │       ├── controller/              # API 요청 처리
    │       │   ├── AuthController.java      # 로그인/회원가입
    │       │   ├── RoadmapController.java   # 로드맵 CRUD
    │       │   └── PurchaseController.java  # 구매 및 체크리스트
    │       │
    │       ├── service/                 # 비즈니스 로직
    │       │   ├── AuthService.java         # 인증 로직
    │       │   ├── RoadmapService.java      # 로드맵 로직
    │       │   ├── ChecklistService.java    # 체크리스트 로직
    │       │   └── PurchaseService.java     # 구매 로직
    │       │
    │       ├── repository/              # DB 접근
    │       │   ├── UserRepository.java
    │       │   ├── RoadmapRepository.java
    │       │   ├── ChecklistRepository.java
    │       │   └── PurchaseRepository.java
    │       │
    │       ├── entity/                  # DB 테이블 매핑
    │       │   ├── User.java
    │       │   ├── Roadmap.java
    │       │   ├── Week.java
    │       │   ├── Checklist.java
    │       │   └── Purchase.java
    │       │
    │       └── dto/                     # 요청/응답 데이터
    │           ├── LoginRequest.java
    │           ├── RoadmapRequest.java
    │           └── RoadmapResponse.java
    │
    └── resources/
        ├── static/                      # 프론트엔드 파일
        └── application.properties       # 서버 설정
```

---

## 🗄 데이터베이스 구조
![ERD](ERD.png)
```
users          # 사용자
├── id
├── username
└── password

roadmaps       # 로드맵
├── id
├── title
├── description
├── duration
├── difficulty
├── startLevel
└── user_id (작성자)

weeks          # 주차
├── id
├── weekNumber
└── roadmap_id

checklists     # 체크리스트 항목
├── id
├── content
├── completed
└── week_id

purchases      # 구매 내역
├── id
├── user_id
└── roadmap_id
```

---

## 🔌 API 목록

### 인증 (Auth)

| 메서드 | 주소 | 설명 |
|--------|------|------|
| POST | `/api/v1/auth/register` | 회원가입 |
| POST | `/api/v1/auth/login` | 로그인 |
| GET | `/api/v1/users/me` | 내 정보 조회 |

#### 회원가입 요청 예시
```json
{
    "username": "testuser",
    "password": "1234"
}
```

#### 로그인 요청 예시
```json
{
    "username": "testuser",
    "password": "1234"
}
```

---

### 로드맵 (Roadmap)

| 메서드 | 주소 | 설명 |
|--------|------|------|
| GET | `/api/v1/roadmaps` | 전체 로드맵 조회 |
| GET | `/api/v1/roadmaps/search?keyword=` | 키워드 검색 |
| GET | `/api/v1/roadmaps/{id}` | 로드맵 상세 조회 |
| GET | `/api/v1/roadmaps/{id}/preview` | 로드맵 미리보기 (구매 전) |
| POST | `/api/v1/roadmaps` | 로드맵 생성 |
| PUT | `/api/v1/roadmaps/{id}` | 로드맵 수정 |
| DELETE | `/api/v1/roadmaps/{id}` | 로드맵 삭제 |

#### 로드맵 생성 요청 예시
```json
{
    "title": "ADsP 3주 단기합격",
    "description": "노베이스도 가능한 ADsP 합격 로드맵",
    "duration": "3주",
    "difficulty": "중상",
    "startLevel": "비전공자",
    "weeks": [
        {
            "weekNumber": 1,
            "checklists": ["1과목 강의 수강", "개념문제 풀기"]
        }
    ]
}
```

---

### 구매 (Purchase)

| 메서드 | 주소 | 설명 |
|--------|------|------|
| POST | `/api/v1/purchases` | 로드맵 구매 |
| GET | `/api/v1/purchases/check?roadmapId=` | 구매 여부 확인 |
| GET | `/api/v1/users/me/purchases` | 내 구매 목록 |

---

### 체크리스트 (Checklist)

| 메서드 | 주소 | 설명 |
|--------|------|------|
| GET | `/api/v1/roadmaps/{id}/checklists` | 체크리스트 조회 |
| PATCH | `/api/v1/checklists/{id}/progress` | 체크박스 상태 저장 |
| GET | `/api/v1/roadmaps/{id}/progress-rate` | 진도율 조회 |

---

## ⚙️ 실행 방법

### 1. 저장소 클론
```bash
git clone https://github.com/kkalist0817/2026-13-.git
```

### 2. application.properties 확인
DB는 Railway 클라우드에 이미 구축되어 있어서 **별도 MySQL 설치 없이** 바로 실행 가능합니다.
`application.properties` 파일이 이미 설정되어 있습니다.

### 3. 서버 실행
IntelliJ에서 `RoadmapServiceApplication.java` 실행

### 4. 접속
```
http://localhost:8080/login.html
```

> 기본 테스트 계정: `admin` / `1234`

---

## ☁️ 클라우드 DB (Railway)

- Railway를 사용하여 MySQL DB를 클라우드에 구축했습니다
- 회원가입, 로그인, 로드맵 생성, 구매 내역이 모두 클라우드 DB에 저장됩니다
- 팀원 모두 같은 DB를 공유하므로 데이터가 실시간으로 반영됩니다

> ⚠️ application.properties의 DB 접속 정보는 해당 해커톤용 테스트 DB입니다.

---

## 🚀 배포 (Railway)

GitHub에 push하면 Railway가 자동으로 빌드 및 배포합니다.

### Dockerfile
```dockerfile
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY . .
RUN chmod +x gradlew
RUN ./gradlew bootJar -x test
EXPOSE 8080
CMD ["java", "-jar", "build/libs/roadmap-service-0.0.1-SNAPSHOT.jar"]
```

---

## 📌 참고사항

- 서버 실행 시 DB 테이블이 자동으로 생성됩니다
- 별도 MySQL 설치 없이 바로 실행 가능합니다
- 로드맵을 직접 등록하면 자동으로 구매 처리되어 메인 화면 구매내역에 즉시 반영됩니다

---

# 🎨 Frontend 구현 내용

프론트엔드는 **HTML, CSS, JavaScript**를 사용하여 구현했습니다.
별도의 프론트엔드 프레임워크 없이 Spring Boot의 정적 리소스 경로인 `src/main/resources/static`에 화면 파일을 배치하여 백엔드 서버와 함께 실행되도록 구성했습니다.

프론트엔드는 사용자가 서비스를 이용하는 전체 흐름인 **회원가입 → 로그인 → 로드맵 검색 → 상세 조회 → 구매 → 구매내역 확인 → 로드맵 생성** 과정을 화면 단위로 구현했습니다.

---

## 프론트엔드 폴더 구조

```text
src/main/resources/static/
├── login.html
├── css/
│   ├── login.css
│   └── roadmap.css
├── js/
│   ├── login.js
│   ├── register.js
│   ├── main.js
│   ├── search.js
│   ├── detail.js
│   └── create.js
├── pages/
│   ├── main.html
│   ├── register.html
│   ├── roadmap-search.html
│   ├── loadmap-detail.html
│   └── roadmap-create.html
└── assets/
```

---
## 🖥 주요 화면
### 1. 로그인 화면

`login.html`은 사용자가 서비스에 접속하기 위한 첫 화면입니다.
ID와 비밀번호를 입력하면 백엔드 로그인 API를 호출하여 로그인 여부를 확인합니다. 

연동 API:
```text
POST /api/v1/auth/login
```

주요 기능:
* ID/PW 입력
* 입력값 누락 시 오류 메시지 출력
* 로그인 실패 시 오류 메시지 출력
* 로그인 성공 시 메인 화면으로 이동
* 회원가입 화면 이동 링크 제공
---

### 2. 회원가입 화면

`register.html`은 신규 사용자가 계정을 생성할 수 있는 화면입니다.
비밀번호 확인 입력값을 함께 받아 프론트엔드에서 1차 검증 후 백엔드 회원가입 API를 호출합니다.

연동 API:
```text
POST /api/v1/auth/register
```

주요 기능:
* ID 입력
* PW 입력
* PW 확인 입력
* 입력값 누락 검사
* 비밀번호 일치 여부 검사
* 회원가입 성공 시 로그인 화면으로 이동
* 중복 계정 등 실패 상황 시 오류 메시지 출력

---

### 3. 메인 화면

`main.html`은 로그인 후 사용자가 처음 진입하는 화면입니다. 서비스 소개 영역, 검색창, 로드맵 만들기 버튼, 내 구매내역을 확인할 수 있도록 구성했습니다.

연동 API:
```text
GET /api/v1/users/me/purchases
```

주요 기능:
* 검색어 입력 후 검색 화면으로 이동
* 로그인한 사용자의 로드맵 보관함 조회
* 구매내역이 없을 경우 안내 문구 표시
* 구매한 로드맵 카드 클릭 시 상세 페이지 이동
* `+ 로드맵 만들기` 버튼을 통한 로드맵 생성 화면 이동

---

### 4. 로드맵 검색 화면

`roadmap-search.html`은 사용자가 원하는 목표나 키워드로 로드맵을 탐색하는 화면입니다.
검색어가 없을 경우 전체 로드맵 목록을 조회하고, 검색어가 있을 경우 해당 키워드에 맞는 로드맵 목록을 조회합니다.

연동 API:
```text
GET /api/v1/roadmaps
GET /api/v1/roadmaps/search?keyword=
```

주요 기능:
* 전체 로드맵 목록 조회
* 키워드 기반 로드맵 검색
* 검색 결과 개수 표시
* 검색 결과 카드 렌더링
* 검색 결과 없음 안내 UI 표시
* 검색 결과 카드 클릭 시 상세 페이지 이동

---

### 5. 로드맵 상세 화면

`loadmap-detail.html`은 검색 결과나 구매내역에서 선택한 로드맵의 상세 정보를 확인하는 화면입니다. URL의 로드맵 ID를 기준으로 백엔드 상세 조회 API를 호출하여 로드맵 데이터를 화면에 표시합니다.

연동 API:
```text
GET /api/v1/roadmaps/{id}
POST /api/v1/purchases
GET /api/v1/purchases/check?roadmapId=
PATCH /api/v1/checklists/{id}/progress
```

주요 기능:
* 로드맵 상세 정보 조회
* 로드맵 제목, 설명, 기간, 난이도, 시작 수준 표시
* 주차별 체크리스트 표시
* 구매 전 잠금 화면 표시
* 구매 버튼 클릭 시 구매 API 호출
* 구매 완료 후 전체 체크리스트 표시
* 체크리스트 완료 여부 변경
* 체크리스트 진행 상태 저장
* 생성한 로드맵 상세 정보 조회 가능
  
---

### 6. 로드맵 만들기 화면

`roadmap-create.html`은 사용자가 직접 새로운 로드맵을 등록할 수 있는 화면입니다. 
로드맵의 기본 정보와 주차별 체크리스트를 입력하면 백엔드 생성 API로 데이터를 전송합니다. 

연동 API:
```text
POST /api/v1/roadmaps
```

전송 데이터는 다음과 같은 구조를 가집니다.

```json
{
  "title": "ADsP 3주 단기합격",
  "description": "노베이스도 가능한 ADsP 합격 로드맵",
  "duration": "3주",
  "difficulty": "중상",
  "startLevel": "비전공자",
  "weeks": [
    {
      "weekNumber": 1,
      "checklists": [
        "1과목 강의 수강",
        "개념문제 풀기"
      ]
    }
  ]
}
```

로드맵 생성이 완료되면 메인 화면으로 이동하며, 이후 검색 화면에서 방금 생성한 로드맵을 조회하고 상세 페이지에서 확인할 수 있습니다.

주요 기능:
* 로드맵 제목, 설명, 기간, 난이도, 시작 수준 입력
* 주차 추가
* 주차 삭제
* 체크리스트 항목 추가
* 체크리스트 항목 삭제
* 입력값 누락 검사
* 로드맵 생성 API 연동
* 생성 완료 후 메인 화면 이동
* 생성한 로드맵 검색 및 상세 조회 가능

---

## 프론트엔드 주요 JavaScript 역할

| 파일명           | 역할                                              |
| ------------- | ----------------------------------------------- |
| `login.js`    | 로그인 API 연동, 로그인 예외 처리, 로그인 성공 시 메인 화면 이동        |
| `register.js` | 회원가입 API 연동, 비밀번호 확인, 회원가입 성공 시 로그인 화면 이동       |
| `main.js`     | 메인 검색 이동, 내 구매내역 API 조회, 구매내역 카드 렌더링            |
| `search.js`   | 전체 로드맵 조회, 키워드 검색, 검색 결과 카드 렌더링                 |
| `detail.js`   | 로드맵 상세 조회, 구매 전/후 화면 분리, 구매 API 호출, 체크리스트 상태 관리 |
| `create.js`   | 주차/체크리스트 입력 UI 생성, 로드맵 생성 API 연동                |

---

## 🔗 프론트엔드 API 연동 흐름

프론트엔드는 fetch()를 사용하여 백엔드 REST API와 통신합니다.
배포 환경에서도 같은 서버에서 정적 파일과 API가 함께 제공되므로, API 요청은 /api/v1/... 형태의 상대 경로를 사용했습니다.

예시:

fetch("/api/v1/roadmaps")
fetch("/api/v1/auth/login")
fetch("/api/v1/purchases")

이를 통해 로컬 환경과 Railway 배포 환경에서 동일한 코드로 동작할 수 있도록 구성했습니다.

---
## 🧭 사용자 이용 흐름
회원가입
→ 로그인
→ 메인 화면 진입
→ 로드맵 검색
→ 로드맵 상세 확인
→ 로드맵 구매
→ 체크리스트 확인
→ 메인 화면에서 구매내역 확인
→ 로드맵 생성
→ 생성한 로드맵 검색 및 상세 확인

---
## 프론트엔드 구현 특징

### 1. 백엔드 API 기반 화면 렌더링

프론트엔드 내부의 임시 데이터 사용을 줄이고, 백엔드 API를 통해 Railway DB에 저장된 데이터를 화면에 반영했습니다.
회원가입, 로그인, 로드맵 조회, 검색, 상세 조회, 생성, 구매, 구매내역 조회 기능이 모두 API 호출을 기반으로 동작합니다.

### 2. Railway DB 기반 데이터 공유

로드맵 생성 데이터와 구매내역은 Railway 클라우드 DB에 저장됩니다.
따라서 한 사용자가 생성한 로드맵은 다른 사용자도 검색을 통해 확인할 수 있으며, 구매내역은 로그인한 사용자별로 구분되어 표시됩니다.

### 3. 구매 전/후 화면 분리

로드맵 상세 화면은 구매 여부에 따라 다르게 표시됩니다.
구매 전에는 잠금 화면을 보여주고, 구매 후에는 전체 주차별 체크리스트를 확인할 수 있도록 구성했습니다.

### 4. 주차별 체크리스트 기반 로드맵 구성

로드맵 생성 시 주차별 체크리스트를 입력할 수 있도록 구현했습니다.
이를 통해 사용자가 단순한 설명이 아니라 실제로 따라갈 수 있는 단계별 실행 계획 형태의 로드맵을 등록할 수 있습니다.

### 5. 화면 UI 통일

로그인, 회원가입, 메인, 검색 화면의 색상과 버튼 스타일을 통일했습니다.
메인 화면과 검색 화면은 카드형 UI와 그라데이션 배경을 활용하여 서비스형 웹 화면처럼 보이도록 개선했습니다.


---
