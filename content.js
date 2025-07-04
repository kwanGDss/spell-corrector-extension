console.log("✅ content.js loaded");

document.addEventListener('input', async (e) => {
  const target = e.target;
  if (target && (target.tagName === "TEXTAREA" || target.tagName === "INPUT")) {
    const text = target.value;

    try {
      if (typeof chrome !== 'undefined' &&
          chrome.runtime &&
          typeof chrome.runtime.sendMessage === 'function') {

        chrome.runtime.sendMessage(
          { action: "correct_text", text },
          (response) => {
            if (response && response.corrected) {
              target.value = response.corrected;
            }
          }
        );
      } else {
        console.warn("⚠️ chrome.runtime.sendMessage is not available.");
      }
    } catch (err) {
      console.error("❌ sendMessage 실패:", err);
    }
  }
});
