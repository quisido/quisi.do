import type { JSX } from '../modules/quisido-browser-game/index.js';
import { useState } from '../modules/quisido-game/index.js';
import Character, { type Props as CharacterProps } from './character.js';

export interface WorldState {
  readonly characters: readonly CharacterProps[];
  readonly destination: readonly [number, number];
}

export default function World(): JSX {
  const [characters] = useState([
    { name: 'Mario', type: 'hero' as const, x: 0, y: 0 },
  ]);

  return characters.map(
    (character: CharacterProps): JSX => (
      <Character key={character.name} {...character} />
    ),
  );
}
