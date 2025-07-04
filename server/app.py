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
            f"입력 문장은 반드시 수정해. 틀렸든 아니든 무조건 다듬고 바꿔. 비슷하더라도 단어 하나라도 바꿔줘. 원본 그대로 돌려주는 건 절대 안 돼. 다음은 입력 문장이야: {input_text}",
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
    app.run(port=5000)
