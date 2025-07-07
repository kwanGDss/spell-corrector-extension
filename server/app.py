import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)
CORS(app)

# Gemini 클라이언트 생성 (API 키를 환경변수에서 가져옴)
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')


@app.route("/correct", methods=["POST"])
def correct():
    data = request.get_json()
    input_text = data.get("text", "")

    if not input_text.strip():
        return jsonify({ "corrected": input_text })

    try:
        response = model.generate_content(
            f"다음 문장의 맞춤법, 문법, 구두점 오류만 교정해줘. 원문의 의미, 내용, 그리고 핵심 단어는 절대 변경하지 마. 문장을 재작성하거나 새로운 정보를 추가하지 마. 오직 교정된 문장만 반환해줘. 다음은 입력 문장이야: {input_text}",
            generation_config=genai.types.GenerationConfig(temperature=0.3)
        )

        corrected = response.text
        if corrected:
            corrected = corrected.strip()
        else:
            corrected = input_text
        print(f"📝 입력: {input_text}")
        print(f"✅ 교정됨: {corrected}")

        return jsonify({ "corrected": corrected })

    except Exception as e:
        print("❌ Gemini 오류:", e)
        return jsonify({ "corrected": input_text })



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)