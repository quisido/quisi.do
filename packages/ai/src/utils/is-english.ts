export default function isEnglish(voice: SpeechSynthesisVoice): boolean {
  return voice.lang.startsWith('en');
}
