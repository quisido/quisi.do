import type { ReactNode } from 'react';
import type { ReactNodeTranslationValue } from './react-node-translation-value.js';
import type { StringTranslationValue } from './string-translation-value.js';

type ReactNodeVars = Record<string, ReactNodeTranslationValue>;
type StringVars = Record<string, StringTranslationValue>;

export default interface TranslateFunction {
  /**
   * translate('Hello, world!')
   * translate('Hello, $world!', { world: 'there' })
   */
  (str: string, vars?: StringVars): string | undefined;

  // translate('Hello, $world!', { world: <strong>there</strong> })
  (str: string, vars: ReactNodeVars): ReactNode | undefined;
}
