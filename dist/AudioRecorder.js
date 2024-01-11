"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioRecorder = void 0;
const WebsocketManager_1 = require("./WebsocketManager");
class AudioRecorder {
    constructor(onNewResult, websocketUrl, language, hotwords, onStop, manualPunctuation) {
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
    startRecording(callKey) {
        return __awaiter(this, void 0, void 0, function* () {
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
            this.webSocketManager = new WebsocketManager_1.WebsocketManager(this.onNewResult, this.websocketUrl, this.language, callKey, this.hotwords, this.onStop, this.manualPunctuation);
            const microphoneLabel = yield this.webSocketManager.start();
            this.currentlyStarting = false;
            this.currentlyRecording = true;
            return {
                microphoneLabel: microphoneLabel,
                error: "",
            };
        });
    }
    stopRecording() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentlyStopping || this.currentlyStarting) {
                return "already_processing";
            }
            this.currentlyStopping = true;
            const res = this.webSocketManager
                ? yield this.webSocketManager.stop()
                : "not_started";
            this.webSocketManager = null;
            this.currentlyStopping = false;
            this.currentlyRecording = false;
            return res;
        });
    }
    // Cleanup method (to be called manually when needed)
    cleanup() {
        if (this.currentlyRecording) {
            this.stopRecording();
        }
    }
}
exports.AudioRecorder = AudioRecorder;
