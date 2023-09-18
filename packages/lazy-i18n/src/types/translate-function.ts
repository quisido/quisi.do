import { ReactNode } from 'react';
import ReactNodeTranslationValue from '../types/react-node-translation-value';
import StringTranslationValue from '../types/string-translation-value';

type ReactNodeVars = Record<string, ReactNodeTranslationValue>;
type StringVars = Record<string, StringTranslationValue>;

interface TranslateFunction {
  // translate('Hello, world!')
  (str: string): string | undefined;

  // translate('Hello, $world!', { world: 'there' })
  (str: string, vars: StringVars): string | undefined;

  // translate('Hello, $world!', { world: <strong>there</strong> })
  (str: string, vars: ReactNodeVars): ReactNode | undefined;
}

export default TranslateFunction;
