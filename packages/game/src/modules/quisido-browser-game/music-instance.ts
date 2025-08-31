import type Instance from '../quisido-game/instance.js';
import type { MusicProps } from '../quisido-game/types.js';
import BrowserElementInstance from './browser-element-instance.js';
import type BrowserNodeInstance from './browser-node-instance.js';

export default class MusicInstance
  extends BrowserElementInstance<'music'>
  implements Instance<BrowserNodeInstance, BrowserElementInstance, 'music'>
{
  public constructor(props: MusicProps) {
    super(
      window.document.createElement('audio'),
      (prevProps: MusicProps, nextProps: MusicProps): void => {
        if (prevProps.loop !== nextProps.loop) {
          this.#setLoop(nextProps.loop);
        }

        if (prevProps.src !== nextProps.src) {
          this.#setSrc(nextProps.src);
        }

        if (prevProps.volume !== nextProps.volume) {
          this.#setVolume(nextProps.volume);
        }
      },
    );

    this.#setLoop(props.loop);
    this.#setSrc(props.src);
    this.#setVolume(props.volume);
  }

  #setLoop(loop: boolean): void {
    if (loop) {
      this.node.setAttribute('loop', 'true');
    } else {
      this.node.setAttribute('loop', '');
    }
  }

  #setSrc(src: string): void {
    this.node.setAttribute('src', src);
  }

  #setVolume(volume: number): void {
    this.node.setAttribute('volume', `${volume}%`);
  }
}
