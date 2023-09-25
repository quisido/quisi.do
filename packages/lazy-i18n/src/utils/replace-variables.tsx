import type { ReactNode } from 'react';
import isPrimitive from '../is/is-primitive.js';
import mapNodeToFragment from '../map/map-node-to-fragment.js';
import type { ReactNodeTranslationValue } from '../types/react-node-translation-value.js';
import type { StringTranslationValue } from '../types/string-translation-value.js';

export default function replaceVariables(
  translation: string,
  vars?: Record<string, StringTranslationValue>,
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
    for (let i = 0; i < newTranslation.length; i += 2) {
      // Every even index is a string.
      // Every odd index may be number, string, or ReactNode.
      // 'Hello $world!' --> ['Hello ', <World />, '!']
      const item: string = newTranslation[i] as string;
      const newItems: ReactNode[] = item.split(`$${variable}`);
      if (newItems.length > 1) {
        for (let j = 0; j < newItems.length - 1; j += 2) {
          newItems.splice(j + 1, 0, value as ReactNode);
        }
        newTranslation.splice(i, 1, ...newItems);
        i += newItems.length - 1;
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
