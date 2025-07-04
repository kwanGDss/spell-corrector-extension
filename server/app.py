import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

app = Flask(__name__)
CORS(app)

# OpenAI 클라이언트 생성 (API 키를 환경변수에서 가져옴)
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


@app.route("/correct", methods=["POST"])
def correct():
    data = request.get_json()
    input_text = data.get("text", "")

    if not input_text.strip():
        return jsonify({ "corrected": input_text })

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "입력 문장은 반드시 수정해. 틀렸든 아니든 무조건 다듬고 바꿔. 비슷하더라도 단어 하나라도 바꿔줘. 원본 그대로 돌려주는 건 절대 안 돼."
                },
                { "role": "user", "content": input_text }
            ],
            temperature=0.3
        )

        corrected = response.choices[0].message.content
        if corrected:
            corrected = corrected.strip()
        else:
            corrected = input_text
        print(f"📝 입력: {input_text}")
        print(f"✅ 교정됨: {corrected}")

        return jsonify({ "corrected": corrected })

    except Exception as e:
        print("❌ OpenAI 오류:", e)
        return jsonify({ "corrected": input_text })



if __name__ == "__main__":
    app.run(port=5000)
