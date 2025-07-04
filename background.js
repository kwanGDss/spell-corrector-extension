chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'correct_text') {
    (async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/correct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: message.text })
        });

        const data = await res.json();
        console.log("🔁 서버 응답:", data);  // ✅ 여기에 응답 출력
        sendResponse({ corrected: data.corrected });

      } catch (err) {
        console.error('❌ API 요청 실패:', err);
        sendResponse({ corrected: message.text });
      }
    })();
    return true;
  }
});
