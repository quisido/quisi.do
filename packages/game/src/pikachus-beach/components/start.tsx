import type { Jsx } from '../../modules/quisido-browser-game/index.js';
import src from './screen.gif';

export default function Start(): Jsx {
  return <draw-image src={src} height={144} width={160} x={0} y={0} />;
}
