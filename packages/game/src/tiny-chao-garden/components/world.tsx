import type { Jsx } from '../../modules/quisido-browser-game/index.js';
import type State from '../state.js';
import Chao from './chao/chao.js';

export default function World({ position: [x, y] }: State): Jsx {
  return <Chao type="neutral" height={24} width={22} x={x} y={y} />;
}
