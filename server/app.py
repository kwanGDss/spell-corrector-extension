from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)

openai.api_key = os.environ.get("OPENAI_API_KEY")

@app.route("/correct", methods=["POST"])
def correct():
    data = request.get_json()
    input_text = data.get("text", "")

    if not input_text.strip():
        return jsonify({ "corrected": input_text })

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                { "role": "system", "content": "문장의 맞춤법과 문맥을 자연스럽게 교정해줘." },
                { "role": "user", "content": input_text }
            ],
            temperature=0.3
        )

        corrected = response.choices[0].message.content.strip()
        return jsonify({ "corrected": corrected })
    except Exception as e:
        print("OpenAI 오류:", e)
        return jsonify({ "corrected": input_text })

if __name__ == "__main__":
    app.run(port=5000)
