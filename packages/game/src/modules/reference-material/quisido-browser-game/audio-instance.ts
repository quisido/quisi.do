import { type Instance } from '../quisido-reconciler/index.js';
import { type BrowserFamily } from './browser-family.js';
import type BrowserTextInstance from './browser-text-instance.js';
import playAudio from './play-audio.js';
import { type AudioProps } from './props.js';

const throwChildMethodError = (): never => {
  throw new Error('Audio cannot have children.');
};

export default class AudioInstance implements Instance<
  AudioProps,
  BrowserTextInstance,
  BrowserFamily
> {
  public readonly appendChild: () => never = throwChildMethodError;
  public readonly insertBefore: () => never = throwChildMethodError;
  public readonly removeChild: () => never = throwChildMethodError;
  public readonly resetTextContent: () => never = throwChildMethodError;
  #stopAudio: VoidFunction | undefined;

  public hide(): void {
    this.remove();
  }

  public mount(props: AudioProps): void {
    this.#stopAudio ??= playAudio(props);
  }

  public remove(): void {
    this.#stopAudio?.();
    this.#stopAudio = undefined;
  }

  public unhide(props: AudioProps): void {
    this.mount(props);
  }

  public update(prevProps: AudioProps, nextProps: AudioProps): void {
    if (
      prevProps.loop === nextProps.loop &&
      prevProps.src === nextProps.src &&
      prevProps.volume === nextProps.volume
    ) {
      return;
    }

    this.remove();
    this.mount(nextProps);
  }
}
