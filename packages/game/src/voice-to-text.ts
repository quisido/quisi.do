interface BrowserSpeechRecognitionAlternative {
  readonly confidence: number;
  readonly transcript: string;
}

interface BrowserSpeechRecognitionResult {
  readonly [index: number]: BrowserSpeechRecognitionAlternative | undefined;
  readonly isFinal: boolean;
}

interface BrowserSpeechRecognitionResultList {
  readonly [index: number]: BrowserSpeechRecognitionResult | undefined;
  readonly length: number;
}

interface BrowserSpeechRecognitionResultEvent extends Event {
  readonly resultIndex: number;
  readonly results: BrowserSpeechRecognitionResultList;
}

interface BrowserSpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface BrowserSpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onerror: ((event: BrowserSpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: BrowserSpeechRecognitionResultEvent) => void) | null;
  abort(): void;
  start(): void;
  stop(): void;
}

type BrowserSpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

interface SpeechRecognitionWindow extends Window {
  readonly SpeechRecognition?: BrowserSpeechRecognitionConstructor | undefined;
  readonly webkitSpeechRecognition?:
    BrowserSpeechRecognitionConstructor | undefined;
}

export interface VoiceToTextError {
  readonly code: string;
  readonly message: string;
}

export interface VoiceToTextTranscript {
  readonly confidence: number;
  readonly isFinal: boolean;
  readonly text: string;
}

export interface VoiceToTextOptions {
  readonly continuous?: boolean | undefined;
  readonly interimResults?: boolean | undefined;
  readonly language?: string | undefined;
  readonly onError?: ((error: VoiceToTextError) => void) | undefined;
  readonly onTranscript: (transcript: VoiceToTextTranscript) => void;
}

export interface VoiceToText {
  abort(): void;
  start(): void;
  stop(): void;
}

const getSpeechRecognitionConstructor = ():
  BrowserSpeechRecognitionConstructor | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const speechRecognitionWindow = window as SpeechRecognitionWindow;

  // The Web Speech API has uneven browser support and may use the browser
  // vendor's servers. For predictable cross-browser transcription, replace
  // this with MediaRecorder plus a service such as OpenAI Whisper or Deepgram.
  return (
    speechRecognitionWindow.SpeechRecognition ??
    speechRecognitionWindow.webkitSpeechRecognition
  );
};

export const isVoiceToTextSupported = (): boolean =>
  getSpeechRecognitionConstructor() !== undefined;

export default function createVoiceToText({
  continuous = true,
  interimResults = true,
  language,
  onError,
  onTranscript,
}: VoiceToTextOptions): VoiceToText {
  const SpeechRecognition = getSpeechRecognitionConstructor();
  if (SpeechRecognition === undefined) {
    throw new Error('Voice-to-text is not supported by this browser.');
  }

  const recognition = new SpeechRecognition();
  Object.assign(recognition, { continuous, interimResults });

  if (language !== undefined) {
    recognition.lang = language;
  }

  recognition.onerror = ({ error, message }): void => {
    onError?.({ code: error, message });
  };

  recognition.onresult = ({ resultIndex, results }): void => {
    for (let index = resultIndex; index < results.length; index += 1) {
      const result = results[index];
      const alternative = result?.[0];

      if (result === undefined || alternative === undefined) {
        continue;
      }

      onTranscript({
        confidence: alternative.confidence,
        isFinal: result.isFinal,
        text: alternative.transcript,
      });
    }
  };

  return {
    abort: (): void => {
      recognition.abort();
    },
    start: (): void => {
      recognition.start();
    },
    stop: (): void => {
      recognition.stop();
    },
  };
}
