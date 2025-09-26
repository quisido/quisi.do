import type { JSX } from '../modules/quisido-browser-game/index.js';
import type State from '../state.js';
import Chao from './chao/chao.js';

export default function World({ facing: _facing, x, y }: State): JSX {
  return <Chao type="neutral" height={24} width={22} x={x} y={y} />;
}
