import { renderPage } from "./listView.js";

renderPage();

// --- Audio recorder logic ---
const audioBtn = document.getElementById("audio-record-btn");
const audioModal = document.getElementById("audio-modal");
const closeModalBtn = document.getElementById("close-audio-modal");
const recordToggle = document.getElementById("record-toggle");
const recordTimerEl = document.getElementById("record-timer");
const playbackEl = document.getElementById("playback");
const audioPlayback = document.getElementById("audio-playback");
const downloadLink = document.getElementById("download-audio");
const reRecordBtn = document.getElementById("re-record");

let mediaRecorder = null;
let chunks = [];
let recordingStart = null;
let timerInterval = null;
let currentBlob = null;

function openModal() {
  if (audioModal) audioModal.classList.remove("hidden");
}
function closeModal() {
  if (audioModal) audioModal.classList.add("hidden");
  stopTracks();
  resetUI();
}

function resetUI() {
  if (recordToggle) {
    recordToggle.textContent = "Grabar";
    recordToggle.classList.remove("recording");
  }
  if (recordTimerEl) recordTimerEl.textContent = "00:00";
}

if (audioBtn) {
  audioBtn.addEventListener("click", () => {
    openModal();
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

if (audioModal) {
  audioModal.addEventListener("click", (e) => {
    if (e.target === audioModal) closeModal();
  });
}

function updateTimer() {
  if (!recordingStart) return;
  const elapsed = Math.floor((Date.now() - recordingStart) / 1000);
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  if (recordTimerEl) recordTimerEl.textContent = `${mm}:${ss}`;
}

if (recordToggle) {
  recordToggle.addEventListener("click", async () => {
    // Start
    if (!mediaRecorder || mediaRecorder.state === "inactive") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorder = new MediaRecorder(stream);
        chunks = [];
        mediaRecorder.ondataavailable = (ev) => {
          if (ev.data && ev.data.size) chunks.push(ev.data);
        };
        mediaRecorder.onstop = onStopRecording;
        mediaRecorder.start();
        recordingStart = Date.now();
        timerInterval = setInterval(updateTimer, 250);
        recordToggle.textContent = "Detener";
        recordToggle.classList.add("recording");
        if (playbackEl) playbackEl.classList.add("hidden");
      } catch (err) {
        alert("No se puede acceder al micrófono. Revisa permisos.");
      }
    } else if (mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
  });
}

function onStopRecording() {
  clearInterval(timerInterval);
  if (recordTimerEl) recordTimerEl.textContent = "00:00";
  const blob = new Blob(chunks, { type: "audio/webm" });
  currentBlob = blob;
  const url = URL.createObjectURL(blob);
  if (audioPlayback) audioPlayback.src = url;
  if (downloadLink) downloadLink.href = url;
  if (playbackEl) playbackEl.classList.remove("hidden");
  stopTracks();
  if (recordToggle) {
    recordToggle.textContent = "Grabar";
    recordToggle.classList.remove("recording");
  }
}

if (reRecordBtn) {
  reRecordBtn.addEventListener("click", () => {
    if (playbackEl) playbackEl.classList.add("hidden");
    currentBlob = null;
  });
}

function stopTracks() {
  try {
    if (mediaRecorder && mediaRecorder.stream) {
      mediaRecorder.stream.getTracks().forEach((t) => t.stop());
    }
  } catch (err) {
    // ignore
  }
}

window.addEventListener("beforeunload", stopTracks);
