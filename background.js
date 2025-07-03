chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) = {
  if (message.action === correct_text) {
    try {
      const res = await fetch(httplocalhost5000correct, {
        method POST,
        headers {
          Content-Type applicationjson
        },
        body JSON.stringify({ text message.text })
      });

      const data = await res.json();
      sendResponse({ corrected data.corrected });
    } catch (err) {
      console.error(❌ API 요청 실패, err);
      sendResponse({ corrected message.text });  실패 시 원문 유지
    }
    return true;  비동기 응답 허용
  }
});
