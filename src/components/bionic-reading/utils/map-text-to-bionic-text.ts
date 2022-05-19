import type { ReactElement } from 'react';
import mapWordToBionicWord from '../utils/map-word-to-bionic-word';
import reduceToSpaceDelimited from '../utils/reduce-to-space-delimited';

export default function mapTextToBionicText(
  text: string,
): readonly (ReactElement | string)[] {
  const words: readonly string[] = text.split(' ');
  const bionicWords: readonly ReactElement[] = words.map(mapWordToBionicWord);
  return bionicWords.reduce<readonly (ReactElement | string)[]>(
    reduceToSpaceDelimited,
    [],
  );
}
