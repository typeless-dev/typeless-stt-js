import { AudioRecorder } from "typeless-stt-js";

// Define callback functions
function onNewResult(data) {
  console.log("New result:", data);
}

function onStop(entireAudioBlob, callKey) {
  console.log("Recording stopped. Call Key:", callKey);
  console.log("Audio Blob:", entireAudioBlob);
}

// Create an instance of AudioRecorder
const audioRecorder = new AudioRecorder(
  onNewResult,
  "wss://speech.typeless.ch/real-time-transcription/", // Replace with your actual WebSocket URL
  "fr", // Language
  ["hotword1", "hotword2"], // Hotwords
  onStop,
  true // Manual punctuation
);

document.getElementById("startButton").addEventListener("click", async () => {
  console.log("Starting recording...");
  const startResponse = await audioRecorder.startRecording("callKey1");
  console.log("Start response:", startResponse);
});

document.getElementById("stopButton").addEventListener("click", async () => {
  console.log("Stopping recording...");
  const stopResponse = await audioRecorder.stopRecording();
  console.log("Stop response:", stopResponse);
});
