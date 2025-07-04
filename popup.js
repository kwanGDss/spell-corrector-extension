document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("sendBtn");
    const input = document.getElementById("input");
    const result = document.getElementById("result");
  
    sendBtn.addEventListener("click", () => {
      const text = input.value.trim();
      if (!text) {
        result.textContent = "❗ 문장을 입력하세요.";
        return;
      }
  
      if (typeof chrome.runtime?.sendMessage === 'function') {
        chrome.runtime.sendMessage(
          { action: "correct_text", text },
          (response) => {
            if (chrome.runtime.lastError) {
              result.textContent = "❌ 오류: " + chrome.runtime.lastError.message;
            } else if (response && response.corrected) {
              result.textContent = "✅ " + response.corrected;
            } else {
              result.textContent = "⚠️ 교정 결과가 없습니다.";
            }
          }
        );
      } else {
        result.textContent = "❌ chrome.runtime.sendMessage 사용할 수 없음.";
      }
    });
  });
  