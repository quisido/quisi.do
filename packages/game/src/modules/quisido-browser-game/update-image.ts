import type { ImageProps } from '../quisido-game/index.js';

export default function updateImage(
  image: HTMLElement,
  props: ImageProps,
): void {
  image.setAttribute('height', props.height.toString());
  image.setAttribute('src', props.src);
  image.setAttribute('width', props.width.toString());
}
