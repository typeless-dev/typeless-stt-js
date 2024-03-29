/// <reference types="node" />
import { RecordAudio } from "./RecordAudio";
export declare class WebsocketManager {
    audioRecorder?: RecordAudio;
    mediaStream?: MediaStream;
    audioSocket?: WebSocket;
    callKey: string;
    paused: boolean;
    webSocketURL: string;
    language: string;
    hotwords: string[];
    onResult?: (data: any) => void;
    onStop: (entireAudioBlob: Blob, callKey: string) => void;
    closeTimeout?: NodeJS.Timeout;
    finalBlob?: Blob;
    starting: boolean;
    stopping: boolean;
    manualPunctuation: boolean;
    constructor(onResult: (data: any) => void, webSocketURL: string, language: string, callKey: string, hotwords: string[], onStop: (entireAudioBlob: Blob, callKey: string) => void, manualPunctuation: boolean);
    blobToBase64(blob: Blob): Promise<unknown>;
    start(): Promise<string>;
    stop(): Promise<"already_stopping" | "finishing" | "instant_kill">;
    closeResources(): Promise<"finishing" | "instant_kill">;
    stopAllMicrophoneInstances(): void;
}
