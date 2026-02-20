from flask import Flask, render_template, request, jsonify
from groq import Groq
import os
import json
import tempfile
from dotenv import load_dotenv
from pathlib import Path

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))
app = Flask(__name__, 
            template_folder=os.path.join(os.path.dirname(__file__), '..', 'templates'),
            static_folder=os.path.join(os.path.dirname(__file__), '..', 'static'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/analyze_audio', methods=['POST'])
def analyze_audio():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded", "feminine": 50, "masculine": 50})

    file = request.files['file']

    try:
        # Save to a temp file so Groq can read it
        suffix = os.path.splitext(file.filename)[-1] or '.webm'
        with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
            file.save(tmp.name)
            tmp_path = tmp.name

        # Transcribe using Groq Whisper
        with open(tmp_path, 'rb') as f:
            transcription = client.audio.transcriptions.create(
                model="whisper-large-v3",
                file=f,
                response_format="text"
            )
        os.unlink(tmp_path)

        text = transcription.strip()
        if not text:
            return jsonify({"error": "No speech detected", "feminine": 50, "masculine": 50})

        # Analyze tone with Groq LLM
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[{
                "role": "user",
                "content": (
                    "Analyze the following text and determine feminine and masculine tone percentages. "
                    "Return ONLY valid JSON with two keys: feminine and masculine (numbers summing to 100).\n\n"
                    f"Text: {text}"
                )
            }],
            response_format={"type": "json_object"}
        )

        result = json.loads(response.choices[0].message.content)
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e), "feminine": 50, "masculine": 50})

# For local development
if __name__ == '__main__':
    app.run(debug=True)
