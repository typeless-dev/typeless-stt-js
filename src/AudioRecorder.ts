import { WebsocketManager } from "./WebsocketManager";

export class AudioRecorder {
  // Attributes
  webSocketManager: WebsocketManager | null;
  currentlyStarting: boolean;
  currentlyStopping: boolean;
  currentlyRecording: boolean;
  onNewResult: (data: any) => void;
  websocketUrl: string;
  language: string;
  hotwords: string[];
  onStop: (entireAudioBlob: Blob, callKey: string) => void;
  manualPunctuation: boolean;

  constructor(
    onNewResult: (data: any) => void,
    websocketUrl: string,
    language: string,
    hotwords: string[],
    onStop: (entireAudioBlob: Blob, callKey: string) => void,
    manualPunctuation: boolean
  ) {
    this.webSocketManager = null;
    this.currentlyStarting = false;
    this.currentlyStopping = false;
    this.currentlyRecording = false;
    this.onNewResult = onNewResult;
    this.websocketUrl = websocketUrl;
    this.language = language;
    this.hotwords = hotwords;
    this.onStop = onStop;
    this.manualPunctuation = manualPunctuation;
  }

  async startRecording(callKey: string) {
    if (this.currentlyStopping) {
      return {
        microphoneLabel: "",
        error: "already_stopping",
      };
    }
    if (this.currentlyStarting) {
      return {
        microphoneLabel: "",
        error: "already_starting",
      };
    }
    if (this.currentlyRecording) {
      return {
        microphoneLabel: "",
        error: "already_recording",
      };
    }
    this.currentlyStarting = true;
    this.webSocketManager = new WebsocketManager(
      this.onNewResult,
      this.websocketUrl,
      this.language,
      callKey,
      this.hotwords,
      this.onStop,
      this.manualPunctuation
    );
    const microphoneLabel = await this.webSocketManager.start();
    this.currentlyStarting = false;
    this.currentlyRecording = true;
    return {
      microphoneLabel: microphoneLabel,
      error: "",
    };
  }

  async stopRecording() {
    if (this.currentlyStopping || this.currentlyStarting) {
      return "already_processing";
    }
    this.currentlyStopping = true;
    const res = this.webSocketManager
      ? await this.webSocketManager.stop()
      : "not_started";
    this.webSocketManager = null;
    this.currentlyStopping = false;
    this.currentlyRecording = false;
    return res;
  }

  // Cleanup method (to be called manually when needed)
  cleanup() {
    if (this.currentlyRecording) {
      this.stopRecording();
    }
  }
}
