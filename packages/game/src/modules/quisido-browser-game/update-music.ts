import type { MusicProps } from '../quisido-game/index.js';

export default function updateMusic(
  element: HTMLAudioElement,
  { loop, src, volume }: MusicProps,
): void {
  if (loop) {
    element.setAttribute('loop', 'true');
  } else {
    element.setAttribute('loop', '');
  }

  element.setAttribute('src', src);
  element.setAttribute('volume', `${volume}%`);
}
