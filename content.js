console.log("✅ content.js loaded");

document.addEventListener('input', async (e) => {
  const target = e.target;
  if (target && (target.tagName === "TEXTAREA" || target.tagName === "INPUT")) {
    const text = target.value;

    // 디바운싱 생략한 기본 버전
    chrome.runtime.sendMessage({ action: "correct_text", text: text }, (response) => {
      if (response && response.corrected) {
        target.value = response.corrected;
      }
    });
  }
});
