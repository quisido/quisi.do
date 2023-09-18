import { ReactNode } from 'react';
import ReactNodeTranslationValue from '../types/react-node-translation-value';
import StringTranslationValue from '../types/string-translation-value';
import TranslateFunction from '../types/translate-function';
import EventEmitter from '../utils/event-emitter';
import replaceVariables from '../utils/replace-variables';

type ReactNodeVars = Record<string, ReactNodeTranslationValue>;
type Event = 'loadFallbackTranslations' | 'loadTranslations' | 'notFound';
type StringVars = Record<string, StringTranslationValue>;

interface Options {
  fallbackTranslations?: Record<string, string>;
  translations?: Record<string, string>;
}

interface Run {
  run: TranslateFunction;
}

export default class RunnableTranslateFunction
  extends EventEmitter<Event, [string]>
  implements Run {
  private _fallbackTranslations: Record<string, string> | undefined;
  private _translations: Record<string, string> | undefined;

  public constructor({ fallbackTranslations, translations }: Options) {
    super();
    this._fallbackTranslations = fallbackTranslations;
    this._translations = translations;
    this.run = this.run.bind(this);
  }

  public run(str: string): string | undefined;
  public run(str: string, vars: StringVars): string | undefined;
  public run(str: string, vars: ReactNodeVars): ReactNode | undefined;
  public run(
    str: string,
    vars?: ReactNodeVars | StringVars,
  ): ReactNode | string | undefined {
    // Load target locale.
    if (typeof this._translations === 'undefined') {
      this.emit('loadTranslations', str);
      return;
    }

    // Use target translation.
    if (typeof this._translations[str] !== 'undefined') {
      return replaceVariables(this._translations[str], vars);
    }

    // Load fallback locale.
    if (typeof this._fallbackTranslations === 'undefined') {
      this.emit('loadFallbackTranslations', str);
      return;
    }

    // Use fallback translation.
    if (typeof this._fallbackTranslations[str] !== 'undefined') {
      return replaceVariables(this._fallbackTranslations[str], vars);
    }

    this.emit('notFound', str);
    return;
  }
}
