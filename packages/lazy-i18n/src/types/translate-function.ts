import type { ReactNode } from 'react';
import type { ReactNodeTranslationValue } from './react-node-translation-value.js';
import type { StringTranslationValue } from './string-translation-value.js';

type ReactNodeVars = Record<string, ReactNodeTranslationValue>;
type StringVars = Record<string, StringTranslationValue>;

export default interface TranslateFunction {
  (str: string, vars?: StringVars): string | undefined;
  (str: string, vars: ReactNodeVars): ReactNode | undefined;
}
