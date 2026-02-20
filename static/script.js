let chart;
let mediaRecorder;
let audioChunks = [];

// Half pie chart with glowing dynamic percentage
function updateChart(feminine, masculine) {
    const percent = feminine > masculine ? feminine : masculine;

    const chartData = {
        datasets: [{
            data: [feminine, masculine],
            backgroundColor: ["#00ffcc", "#ff4b5c"],
            borderWidth: 0
        }]
    };

    const config = {
        type: 'doughnut',
        data: chartData,
        options: {
            rotation: -90,
            circumference: 180,
            cutout: '70%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
                beforeDraw: (chart) => {
                    const ctx = chart.ctx;
                    const width = chart.width;
                    const height = chart.height;
                    ctx.restore();
                    const fontSize = (height / 6).toFixed(2);
                    ctx.font = fontSize + "px Arial";
                    ctx.fillStyle = "#ffffff";
                    ctx.textBaseline = "middle";

                    const text = percent + "%";
                    const textX = Math.round((width - ctx.measureText(text).width) / 2);
                    const textY = height / 1.2;

                    // Dynamic glow based on percentage
                    const glowStrength = Math.floor(5 + (percent / 100) * 25); // 5–30
                    ctx.shadowColor = "#00ffe0";
                    ctx.shadowBlur = glowStrength;

                    ctx.fillText(text, textX, textY);
                    ctx.save();
                }
            }
        }
    };

    if (chart) chart.destroy();
    chart = new Chart(document.getElementById("chart"), config);
}

// Record microphone
async function startRecording() {
    document.getElementById("result").innerText = "🎤 Recording... Speak now";
    audioChunks = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('file', audioBlob, 'recording.webm');
        analyzeAudio(formData);
    };

    mediaRecorder.start();

    setTimeout(() => mediaRecorder.stop(), 5000);
}

// Upload audio file
function uploadAudio() {
    const fileInput = document.getElementById("audioFile");
    if (fileInput.files.length === 0) {
        alert("Please select a file first!");
        return;
    }
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    analyzeAudio(formData);
}

// Send audio to backend
async function analyzeAudio(formData) {
    document.getElementById("result").innerText = "Analyzing audio...";
    try {
        const res = await fetch("/analyze_audio", {
            method: "POST",
            body: formData
        });
        const data = await res.json();

        if (data.error) {
            document.getElementById("result").innerText = "Error: " + data.error;
            return;
        }

        const feminine = data.feminine;
        const masculine = data.masculine;
        const leaning = feminine > masculine ? "Feminine" : "Masculine";

        document.getElementById("result").innerText =
            "Voice Leaning: " + leaning;

        updateChart(feminine, masculine);

    } catch (err) {
        document.getElementById("result").innerText = "Error: " + err;
    }
}