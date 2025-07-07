chrome.commands.onCommand.addListener((command) => {
  if (command === 'correct_text') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.log("활성 탭을 찾을 수 없습니다.");
        return;
      }
      const tabId = tabs[0].id;

      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          func: getActiveElementText,
        },
        (injectionResults) => {
          if (chrome.runtime.lastError || !injectionResults || !injectionResults[0]) {
            console.error("스크립트 실행 실패:", chrome.runtime.lastError?.message || "결과 없음");
            return;
          }

          const { text, type } = injectionResults[0].result;

          if (!text || !text.trim()) {
            console.log("텍스트가 비어 있어 교정을 요청하지 않습니다.");
            return;
          }

          console.log("교정할 텍스트:", text);

          fetch('http://13.125.213.45:5000/correct', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
          })
          .then(res => res.json())
          .then(data => {
            console.log("🔁 서버 응답:", data);
            if (data.corrected) {
              chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: setActiveElementText,
                args: [data.corrected, type]
              });
            }
          })
          .catch(err => {
            console.error('❌ API 요청 실패:', err);
          });
        }
      );
    });
  }
});

// 페이지에서 활성 요소의 텍스트를 가져오는 함수
function getActiveElementText() {
  const activeElement = document.activeElement;
  let text = null;
  let type = null;
  if (activeElement) {
    if (activeElement.isContentEditable) {
      text = activeElement.textContent;
      type = 'contentEditable';
    } else if (activeElement.tagName === "TEXTAREA" || (activeElement.tagName === "INPUT" && /text|search|email|url|password/.test(activeElement.type))) {
      text = activeElement.value;
      type = 'value';
    }
  }
  return { text, type };
}

// 페이지의 활성 요소에 텍스트를 설정하는 함수
function setActiveElementText(correctedText, type) {
  const activeElement = document.activeElement;
  if (activeElement) {
    if (type === 'contentEditable') {
      activeElement.textContent = correctedText;
    } else if (type === 'value') {
      activeElement.value = correctedText;
    }
  }
}