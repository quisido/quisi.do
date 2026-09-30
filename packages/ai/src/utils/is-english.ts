export default function isEnglish(voice: SpeechSynthesisVoice): boolean {
  const lang: string = voice.lang.toLowerCase();
  return lang === 'en' || lang.startsWith('en-');
}
