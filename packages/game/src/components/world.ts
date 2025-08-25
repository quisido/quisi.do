import { type default as Actions, type TapAction } from '../actions.js';
import {
  type GameObject,
  type StringifiableRecord,
} from '../modules/quisido-game/index.js';
import character, { type Character } from './character.js';

export interface WorldState extends StringifiableRecord {
  readonly characters: readonly Character[];
  readonly destination: readonly [number, number];
}

const handleTapCharacters = (
  characters: readonly Character[],
  payload: TapAction,
): readonly Character[] => {};

function handleTap(
  this: GameObject<Actions, WorldState>,
  payload: TapAction,
): void {
  this.setState(
    'characters',
    (characters: readonly Character[] = []): readonly Character[] =>
      handleTapCharacters(characters, payload),
  );
}

export default function world(this: GameObject<Actions, WorldState>): void {
  this.onAction('tap', handleTap);

  return {
    main: [
      character,
      {
        name: 'Ace',
        type: 'hero',
        x: 0,
        y: 0,
      },
    ],
    shadow: [
      character,
      {
        name: 'Shadow',
        type: 'villain',
        x,
        y,
      },
    ],
  };
}
