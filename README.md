# ✨ 문맥 기반 맞춤법 교정기 (Chrome 확장 프로그램)

> 웹사이트 어디에서든 실시간으로 문장을 감지하고, GPT API를 이용해 앞뒤 맥락까지 고려한 맞춤법을 자동으로 교정합니다.

---

## 📌 주요 기능

- ✅ textarea / input / contenteditable 영역의 입력 실시간 감지  
- ✅ OpenAI GPT API를 통한 문맥 기반 문장 교정  
- ✅ Flask 서버를 통해 안전하게 교정 처리  
- ✅ Chrome 확장 형태로 어떤 웹사이트에서도 동작  
- ✅ (선택) React 기반 popup UI 추가 예정

---

## 📂 폴더 구조

    spell-corrector-extension/
    ├── manifest.json        # 크롬 확장 메타 정보
    ├── content.js           # 입력 감지 및 메시지 전송
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
