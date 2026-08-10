/*
onvoiceschanged: ((this: SpeechSynthesis, ev: Event) => any) | null;
readonly paused: boolean;
readonly speaking: boolean;
cancel(): void;
getVoices(): SpeechSynthesisVoice[];
pause(): void;
resume(): void;
speak(utterance: SpeechSynthesisUtterance): void;
addEventListener<K extends keyof SpeechSynthesisEventMap>(type: K, listener: (this: SpeechSynthesis, ev: SpeechSynthesisEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
removeEventListener<K extends keyof SpeechSynthesisEventMap>(type: K, listener: (this: SpeechSynthesis, ev: SpeechSynthesisEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
*/

const voices: readonly SpeechSynthesisVoice[] =
  window.speechSynthesis.getVoices();

const isEnglish = (voice: SpeechSynthesisVoice) => voice.lang.startsWith('en');

console.log(voices.filter(isEnglish));
