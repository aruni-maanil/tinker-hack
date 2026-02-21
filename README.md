<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# The XY Analyzer 🧬

## Basic Details

### Team Name: Arunima Anil

### Team Members
- Member 1: Arunima Anil - Viswajyothi College of Engineering

### Hosted Project Link
[https://tinker-hack.onrender.com/](https://tinker-hack.onrender.com/)

### Project Description
The XY Analyzer is a web app that analyzes a user's voice to determine whether it leans more feminine or masculine. It supports recording or uploading audio, converts it to text using Groq's Whisper model, and displays the result in a dynamic glowing half-pie chart.

### The Problem Statement
Human communication carries subtle tonal patterns that can be classified as more feminine or masculine in style — but there's no quick, accessible tool to visualize this in real time from voice input.

### The Solution
The XY Analyzer lets users record or upload audio directly in the browser. It transcribes the speech using Groq Whisper, analyzes the linguistic tone via a Groq LLM (LLaMA 3), and presents the feminine/masculine ratio visually through an animated glowing chart.

---

## Technical Details

### Technologies/Components Used

**For Software:**
- Languages used: Python, HTML, CSS, JavaScript
- Frameworks used: Flask
- Libraries used: Groq SDK, python-dotenv, gunicorn
- Tools used: VS Code, Git, Render (hosting), Groq Cloud API

---

## Features

- 🎙️ **Live Audio Recording:** Record your voice directly in the browser with one click
- 📁 **Audio File Upload:** Upload any audio file (webm, mp3, wav, etc.) for analysis
- 🤖 **AI Transcription:** Uses Groq Whisper (whisper-large-v3) to convert speech to text
- 📊 **Tone Analysis:** LLaMA 3 70B analyzes the transcribed text for feminine/masculine tone percentages
- 🌗 **Glowing Half-Pie Chart:** Results displayed as a dynamic, animated visual with a neon aesthetic

---

## Implementation

### For Software:

#### Installation
```bash
git clone https://github.com/YOUR_USERNAME/tinker-hack.git
cd tinker-hack
pip install -r requirements.txt
```

Create a `.env` file in the root folder:
```
GROQ_API_KEY=your_groq_api_key_here
```

#### Run
```bash
python app.py
```
Then open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

---

## Project Documentation

### For Software:

#### Screenshots

![Homepage](Screenshot_2026-02-21_080549.png)
*The XY Analyzer homepage — users can record audio or upload a file for analysis*

![Recording](Screenshot_2026-02-21_080636.png)
*Live recording state — the app shows "Recording... Speak now" while capturing audio*

![Result](Screenshot_2026-02-21_080709.png)
*Analysis result — "Voice Leaning: Masculine" displayed with an animated glowing half-pie chart*

#### Diagrams

**Application Workflow:**

```
User (Record / Upload Audio)
        ↓
Flask Backend (/analyze_audio)
        ↓
Groq Whisper API (whisper-large-v3)
  → Transcribes audio to text
        ↓
Groq LLM API (llama3-70b-8192)
  → Analyzes tone → returns { feminine: X, masculine: Y }
        ↓
Frontend renders animated glowing half-pie chart
```

---

## Additional Documentation

### API Documentation

**Base URL:** `https://tinker-hack.onrender.com`

#### Endpoints

**GET /**
- **Description:** Serves the main frontend HTML page
- **Response:** `index.html`

**POST /analyze_audio**
- **Description:** Accepts an audio file, transcribes it, and returns feminine/masculine tone percentages
- **Request:** `multipart/form-data` with field `file` (audio file)
- **Response:**
```json
{
  "feminine": 65,
  "masculine": 35
}
```
- **Error Response:**
```json
{
  "error": "Error description here",
  "feminine": 50,
  "masculine": 50
}
```

---

## Project Demo

### Video


https://github.com/user-attachments/assets/e9931da9-7fc6-4e3f-86d1-c5ab602d2a62


### Live Site
🔗 [https://tinker-hack.onrender.com/](https://tinker-hack.onrender.com/)

---

## AI Tools Used

**Tool Used:** Claude (Anthropic)

**Purpose:**
- Rewrote the Flask backend to remove ffmpeg/pydub dependencies and replace with Groq Whisper
- Debugging deployment issues on Render
- Code optimization and cleanup

**Key Prompts Used:**
- "Rewrite without ffmpeg and use minimal dependencies"
- "Deploy your full Flask app completely free using Render"

**Percentage of AI-generated code:** ~40%

**Human Contributions:**
- Project concept and design
- Frontend UI/UX (glowing half-pie chart, neon aesthetic)
- Integration and testing
- Audio recording logic in the browser

---

## Team Contributions

- **Arunima Anil:** Full project — concept, frontend development, backend development, API integration, deployment, and documentation

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ at TinkerHub
