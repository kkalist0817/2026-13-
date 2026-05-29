# 📚 Roadmap Service - 백엔드 API 서버

학습 로드맵을 생성, 검색, 구매하고 진도를 관리하는 서비스의 백엔드 API 서버입니다.

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

---

## ☁️ 클라우드 DB (Railway)

- Railway를 사용하여 MySQL DB를 클라우드에 구축했습니다
- 회원가입, 로그인, 로드맵 생성, 구매 내역이 모두 클라우드 DB에 저장됩니다
- 팀원 모두 같은 DB를 공유하므로 데이터가 실시간으로 반영됩니다

> ⚠️ application.properties의 DB 접속 정보는 해달 해커톤용 테스트 DB입니다.

---

## 📌 참고사항

- 서버 실행 시 DB 테이블이 자동으로 생성됩니다
- 별도 MySQL 설치 없이 바로 실행 가능합니다




  # 💻Frontend 구현 내용

프론트엔드는 별도의 프레임워크 없이 **HTML, CSS, JavaScript** 기반으로 구현되었습니다.
프론트엔드 파일은 Spring Boot의 정적 리소스 경로인 `src/main/resources/static` 폴더에 위치하고, 백엔드 서버 실행 후 `http://localhost:8080/login.html` 주소를 통해 접근할 수 있습니다.

### 프론트엔드 폴더 구조

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

### 주요 화면 구성

#### 1. 로그인 화면

`login.html`은 사용자가 서비스에 접속하기 위한 첫 화면입니다.

주요 기능은 다음과 같습니다.

* ID/PW 입력
* 입력값 누락 시 예외 처리
* 로그인 실패 시 오류 메시지 출력
* 로그인 성공 시 메인 화면으로 이동
* 회원가입 페이지 이동 링크 제공

로그인 기능은 기존의 하드코딩 방식이 아니라, 백엔드 로그인 API와 연동되도록 구현하였습니다.

```text
POST /api/v1/auth/login
```

---

#### 2. 회원가입 화면

`register.html`은 신규 사용자가 계정을 생성할 수 있는 화면입니다.

주요 기능은 다음과 같습니다.

* ID 입력
* PW 입력
* PW 확인 입력
* 입력값 누락 검사
* 비밀번호 일치 여부 검사
* 회원가입 성공 시 로그인 화면으로 이동

회원가입 기능은 백엔드 회원가입 API와 연동되어 있습니다.

```text
POST /api/v1/auth/register
```

---

#### 3. 메인 화면

`main.html`은 로그인 후 사용자가 처음 진입하는 화면입니다.

주요 기능은 다음과 같습니다.

* 서비스명 및 간단한 소개 표시
* 로드맵 검색창 제공
* 로드맵 만들기 버튼 제공
* 내 구매 내역 표시
* 구매한 로드맵 클릭 시 상세 페이지 이동

초기에는 임시 구매내역 데이터를 사용했으나, 이후 신규 사용자가 로그인했을 때 가짜 구매내역이 보이지 않도록 수정하였습니다.
현재는 사용자가 실제로 구매한 로드맵만 메인 구매내역에 반영되도록 구현하였습니다.

---

#### 4. 로드맵 검색 화면

`roadmap-search.html`은 사용자가 원하는 목표나 키워드로 로드맵을 검색하는 화면입니다.

주요 기능은 다음과 같습니다.

* 검색어 입력
* 검색 버튼 클릭 또는 Enter 입력으로 검색 실행
* 메인 화면에서 전달된 검색어 자동 적용
* 검색 결과 카드 렌더링
* 검색 결과 없음 안내 UI 표시
* 검색 결과 카드 클릭 시 상세 페이지 이동

검색 기능은 백엔드 로드맵 조회 및 검색 API와 연동되어 있습니다.

```text
GET /api/v1/roadmaps
GET /api/v1/roadmaps/search?keyword={keyword}
```

따라서 로드맵 만들기 화면에서 새로 생성한 로드맵도 검색 결과에 반영됩니다.

---

#### 5. 로드맵 상세 화면

`loadmap-detail.html`은 선택한 로드맵의 상세 정보를 확인하는 화면입니다.

주요 기능은 다음과 같습니다.

* 로드맵 제목 표시
* 설명 표시
* 기간, 난이도, 시작 수준 표시
* 구매 전 잠금 화면 표시
* 구매 후 전체 체크리스트 표시
* 체크리스트 완료 여부 저장
* 새로고침 후에도 구매 상태 및 체크 상태 유지

상세 페이지는 백엔드 상세 조회 API와 연동되어 있습니다.

```text
GET /api/v1/roadmaps/{id}
```

기존에는 프론트엔드 내부 mock 데이터를 기준으로 상세 화면을 보여주었으나, 현재는 API를 통해 DB에 저장된 로드맵 상세 정보를 불러오도록 수정하였습니다.
이로 인해 사용자가 새로 생성한 로드맵도 검색 후 상세 페이지에서 정상적으로 확인할 수 있습니다.

---

#### 6. 로드맵 만들기 화면

`roadmap-create.html`은 사용자가 새로운 로드맵을 등록하는 화면입니다.

입력 항목은 다음과 같습니다.

* 로드맵 제목
* 설명
* 기간
* 난이도
* 시작 수준
* 주차별 체크리스트

주요 기능은 다음과 같습니다.

* 주차 추가
* 주차 삭제
* 체크리스트 항목 추가
* 체크리스트 항목 삭제
* 입력값 누락 검사
* 로드맵 생성 API 연동
* 생성 완료 후 메인 화면으로 이동

로드맵 생성 기능은 백엔드 로드맵 생성 API와 연동되어 있습니다.

```text
POST /api/v1/roadmaps
```

요청 데이터는 다음과 같은 구조로 전송됩니다.

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

로드맵을 생성하면 DB에 저장되며, 이후 검색 화면에서 해당 로드맵을 검색하고 상세 페이지에서 확인할 수 있습니다.

---

### 프론트엔드 주요 JavaScript 역할

| 파일명           | 역할                                     |
| ------------- | -------------------------------------- |
| `login.js`    | 로그인 API 연동, 로그인 예외 처리, 로그인 성공 시 메인 이동  |
| `register.js` | 회원가입 API 연동, 비밀번호 확인, 회원가입 성공 시 로그인 이동 |
| `main.js`     | 메인 검색 이동, 구매내역 렌더링, 로드맵 만들기 페이지 이동     |
| `search.js`   | 전체 로드맵 조회, 키워드 검색, 검색 결과 렌더링           |
| `detail.js`   | 로드맵 상세 조회, 구매 전/후 화면 분리, 체크리스트 상태 저장   |
| `create.js`   | 주차/체크리스트 입력 UI 생성, 로드맵 생성 API 연동       |

---

### 프론트엔드 구현 특징

#### 1. 백엔드 API 기반 화면 렌더링

검색, 상세 조회, 로그인, 회원가입, 로드맵 생성 기능은 백엔드 API와 연동하여 동작하도록 구현하였습니다.

#### 2. 사용자 흐름 중심의 화면 구성

사용자가 서비스를 이용하는 흐름을 다음과 같이 구성하였습니다.

```text
회원가입 / 로그인
→ 메인 화면
→ 로드맵 검색
→ 상세 페이지 확인
→ 로드맵 구매
→ 체크리스트 기반 진도 관리
→ 메인 구매내역 확인
```

#### 3. 구매 전/후 화면 분리

로드맵 상세 페이지에서는 구매 여부에 따라 다른 화면을 보여줍니다.

* 구매 전: 일부 정보와 잠금 화면 표시
* 구매 후: 전체 주차별 체크리스트 표시

#### 4. localStorage 기반 상태 유지

해커톤 MVP 범위에서는 구매 상태와 체크리스트 진행 상태를 `localStorage`를 활용하여 저장하였습니다.
이를 통해 페이지 새로고침 후에도 구매 완료 상태와 체크리스트 체크 상태가 유지되도록 구현하였습니다.

#### 5. 체크리스트 기반 로드맵 생성

로드맵 생성 화면에서는 주차별로 체크리스트 항목을 추가할 수 있도록 구현했습니다.
이를 통해 단순 텍스트 설명이 아니라, 사용자가 실제로 따라갈 수 있는 단계별 실행 계획 형태의 로드맵을 등록할 수 있습니다.

---

### 프론트엔드 실행 흐름

백엔드 서버 실행 후 브라우저에서 다음 주소로 접속합니다.

```text
http://localhost:8080/login.html
```

기본 사용 흐름은 다음과 같습니다.

```text
1. 회원가입 또는 로그인
2. 메인 화면 진입
3. 로드맵 검색
4. 로드맵 상세 페이지 확인
5. 구매 버튼 클릭
6. 체크리스트 확인 및 완료 표시
7. 메인 화면에서 구매내역 확인
8. 로드맵 만들기에서 새 로드맵 생성
9. 검색 화면에서 생성한 로드맵 확인
```

