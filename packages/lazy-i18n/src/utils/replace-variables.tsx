import type { ReactNode } from 'react';
import isPrimitive from '../is/is-primitive.js';
import mapNodeToFragment from '../map/map-node-to-fragment.js';
import type { ReactNodeTranslationValue } from '../types/react-node-translation-value.js';
import type { StringTranslationValue } from '../types/string-translation-value.js';

const ARRAY_INDEX_OFFSET = 1;
const LAST_ITEM = 1;
const SINGLE = 1;
const SKIP = 2;
const START = 0;
const VARIABLE_PREFIX = '$';

export default function replaceVariables(
  translation: string,
  vars?: Readonly<Record<string, StringTranslationValue>>,
): string;
export default function replaceVariables(
  translation: string,
  vars?: Record<string, ReactNodeTranslationValue>,
): ReactNode;
export default function replaceVariables(
  translation: string,
  vars?: Record<string, ReactNodeTranslationValue>,
): ReactNode | string {
  if (typeof vars === 'undefined') {
    return translation;
  }

  const newTranslation: ReactNode[] = [translation];
  for (const [variable, value] of Object.entries(vars)) {
    for (let i = START; i < newTranslation.length; i += SKIP) {
      /**
       * Every even index is a string.
       * Every odd index may be number, string, or ReactNode.
       * 'Hello $world!' --> ['Hello ', <World />, '!']
       */
      const item: string = newTranslation[i] as string;
      const newItems: ReactNode[] = item.split(`${VARIABLE_PREFIX}${variable}`);
      if (newItems.length > SINGLE) {
        for (let j = START; j < newItems.length - LAST_ITEM; j += SKIP) {
          newItems.splice(j + ARRAY_INDEX_OFFSET, START, value as ReactNode);
        }
        newTranslation.splice(i, VARIABLE_PREFIX.length, ...newItems);
        i += newItems.length - ARRAY_INDEX_OFFSET;
      }
    }
  }

  // string variables
  if (newTranslation.every(isPrimitive)) {
    return newTranslation.join('');
  }

  // React node variables
  return <>{newTranslation.map(mapNodeToFragment)}</>;
}
