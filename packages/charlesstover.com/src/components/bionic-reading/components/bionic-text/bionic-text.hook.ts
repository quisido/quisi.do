import type { ReactElement } from 'react';
import { useMemo } from 'react';
import mapTextToBionicText from '../../utils/map-text-to-bionic-text';

export default function useBionicText(
  text: string,
): readonly (ReactElement | string)[] {
  return useMemo((): readonly (ReactElement | string)[] => {
    return mapTextToBionicText(text);
  }, [text]);
}
