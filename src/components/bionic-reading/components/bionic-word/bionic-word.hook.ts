import { useMemo } from 'react';

// Bold The FIrst One THird Of The Word, With A MInimum Of One LEtter And
//   A MAximum Of THree LETters.
const BOLD_LETTER_RATIO = 3;
const BOLD_LETTER_MAX = 3;
const BOLD_LETTER_MIN = 1;

export default function useBionicWord(word: string): number {
  return useMemo((): number => {
    return Math.max(
      BOLD_LETTER_MIN,
      Math.min(BOLD_LETTER_MAX, Math.round(word.length / BOLD_LETTER_RATIO)),
    );
  }, [word]);
}
