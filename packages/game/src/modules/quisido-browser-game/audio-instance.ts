import type { Instance } from '../quisido-game/index.js';
import type { BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';
import playAudio from './play-audio.js';
import type { AudioProps } from './props.js';

const throwChildMethodError = (): never => {
  throw new Error('Audio cannot have children.');
};

export default class AudioInstance
  implements Instance<AudioProps, BrowserTextInstance, BrowserFamily>
{
  public readonly appendChild = throwChildMethodError;
  public readonly insertBefore = throwChildMethodError;
  public readonly removeChild = throwChildMethodError;
  public readonly resetTextContent = throwChildMethodError;
  #stopAudio: VoidFunction;

  public constructor(props: AudioProps) {
    this.#stopAudio = playAudio(props);
  }

  public hide(): void {
    this.#stopAudio();
  }

  public remove(): void {
    this.#stopAudio();
  }

  public unhide(props: AudioProps): void {
    this.#stopAudio = playAudio(props);
  }

  public update(_prevProps: AudioProps, nextProps: AudioProps): void {
    this.#stopAudio();
    this.#stopAudio = playAudio(nextProps);
  }
}
