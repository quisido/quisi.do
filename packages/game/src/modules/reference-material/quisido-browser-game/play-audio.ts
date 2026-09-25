import type { AudioProps } from './props.js';
import SyncMap from './sync-map.js';

const mapSrcToHtmlAudioElement = (src: string): HTMLAudioElement =>
  new Audio(src);

const HtmlAudioElements = new SyncMap<string, HTMLAudioElement>(
  mapSrcToHtmlAudioElement,
);

const handlePlayError = (err: unknown): void => {
  // Ignore "play() failed because the user didn't interact with the document first" errors.
  if (err instanceof DOMException && err.name === 'NotAllowedError') {
    return;
  }

  window.console.error('Failed to play sound:', err);
};

export default function playAudio({
  loop,
  src,
  volume,
}: AudioProps): VoidFunction {
  const element: HTMLAudioElement = HtmlAudioElements.get(src);
  element.loop = loop;
  element.volume = volume / 100;

  void element.play().catch(handlePlayError);

  return (): void => {
    element.pause();
    element.currentTime = 0;
  };
}
