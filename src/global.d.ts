// src/global.d.ts

export {};

declare global {
  // Minimal SpeechRecognitionEvent type
  interface SpeechRecognitionEvent {
    results: {
      [index: number]: {
        [index: number]: { transcript: string };
      };
    };
  }

  // Minimal SpeechRecognition interface
  interface ISpeechRecognition extends EventTarget {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    start: () => void;
    stop: () => void;
    onstart: (() => void) | null;
    onend: (() => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
  }

  // Constructor type for SpeechRecognition
  interface SpeechRecognitionConstructor {
    new (): ISpeechRecognition;
  }

  // Extend the Window interface so we can use SpeechRecognition safely
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}
