import type { ReactElement } from 'react';
import BionicWord from '../components/bionic-word';

export default function mapWordToBionicWord(
  word: string,
  index: number,
): ReactElement {
  return <BionicWord key={index}>{word}</BionicWord>;
}
