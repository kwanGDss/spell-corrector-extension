# ✨ 문맥 기반 맞춤법 교정기 (Chrome 확장 프로그램)

> 웹사이트 어디에서든 실시간으로 문장을 감지하고, GPT API를 이용해 앞뒤 맥락까지 고려한 맞춤법을 자동으로 교정합니다.

---

## 📌 주요 기능

- ✅ `Ctrl+Shift+S` 단축키를 통한 문맥 기반 문장 교정
- ✅ Gemini API를 통한 문맥 기반 문장 교정
- ✅ Flask 서버를 통해 안전하게 교정 처리
- ✅ Chrome 확장 형태로 어떤 웹사이트에서도 동작
- ✅ (선택) React 기반 popup UI 추가 예정

---

## 📂 폴더 구조

    spell-corrector-extension/
    ├── manifest.json        # 크롬 확장 메타 정보
    ├── background.js        # 서버와 통신 처리
    ├── popup.html           # 확장 아이콘 클릭 시 UI
    ├── icons/               # 확장 아이콘 이미지
    └── server/              # Flask API 서버 (GPT 연동)
        ├── app.py
        └── ...

---

## 🚀 설치 및 실행 방법

### 1. GPT API 서버 실행

    cd server
    pip install -r requirements.txt
    python app.py

`.env` 파일에 다음 내용을 포함하세요:

    OPENAI_API_KEY=sk-...

### 2. Chrome 확장 프로그램 등록

1. Chrome → `chrome://extensions` 이동  
2. "개발자 모드" 활성화  
3. "압축해제된 확장 프로그램 로드" 클릭  
4. `spell-corrector-extension/` 폴더 선택

---

## 💡 사용법

1.  텍스트를 입력할 수 있는 웹 페이지 (예: 검색창, 게시판, 이메일 작성 칸 등)로 이동합니다.
2.  교정하고 싶은 텍스트를 입력합니다.
3.  텍스트 입력 필드에 커서가 있는 상태에서 `Ctrl + Shift + S` 단축키를 누릅니다.
4.  입력된 텍스트가 Gemini API를 통해 교정되어 자동으로 업데이트됩니다.

---

## 🧠 기술 스택

- **Frontend**: HTML, JavaScript (Content Script), Chrome Extension API  
- **Backend**: Python, Flask  
- **AI Model**: OpenAI GPT-3.5-turbo  
- **기타**: manifest v3, CORS, REST API, git

---

## 📜 라이선스

MIT License © 2025 정관영

---

## ✉️ 연락

문의: [jky6216@naver.com]  
또는 이 GitHub 저장소의 Issues를 통해 의견을 남겨주세요.