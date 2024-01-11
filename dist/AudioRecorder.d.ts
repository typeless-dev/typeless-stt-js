import { WebsocketManager } from "./WebsocketManager";
export declare class AudioRecorder {
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
    constructor(onNewResult: (data: any) => void, websocketUrl: string, language: string, hotwords: string[], onStop: (entireAudioBlob: Blob, callKey: string) => void, manualPunctuation: boolean);
    startRecording(callKey: string): Promise<{
        microphoneLabel: string;
        error: string;
    }>;
    stopRecording(): Promise<"already_stopping" | "finishing" | "instant_kill" | "already_processing" | "not_started">;
    cleanup(): void;
}
