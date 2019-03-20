import type { ReactNode } from 'react';
import type { ReactNodeTranslationValue } from '../types/react-node-translation-value.js';
import type { StringTranslationValue } from '../types/string-translation-value.js';
import type TranslateFunction from '../types/translate-function.js';
import EventEmitter from '../utils/event-emitter.js';
import replaceVariables from '../utils/replace-variables.js';

type ReactNodeVars = Record<string, ReactNodeTranslationValue>;
type Event = 'loadFallbackTranslations' | 'loadTranslations' | 'notFound';
type StringVars = Record<string, StringTranslationValue>;

interface Options {
  readonly fallbackTranslations?: Record<string, string> | undefined;
  readonly translations?: Record<string, string> | undefined;
}

interface Run {
  readonly run: TranslateFunction;
}

export default class RunnableTranslateFunction
  extends EventEmitter<Event, [string]>
  implements Run
{
  private readonly _fallbackTranslations: Record<string, string> | undefined;

  private readonly _translations: Record<string, string> | undefined;

  public constructor({ fallbackTranslations, translations }: Options) {
    super();
    this._fallbackTranslations = fallbackTranslations;
    this._translations = translations;
    this.run = this.run.bind(this);
  }

  public run(str: string, vars?: StringVars): string | undefined;
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
    const translationsStr: string | undefined = this._translations[str];
    if (typeof translationsStr !== 'undefined') {
      return replaceVariables(translationsStr, vars);
    }

    // Load fallback locale.
    if (typeof this._fallbackTranslations === 'undefined') {
      this.emit('loadFallbackTranslations', str);
      return;
    }

    // Use fallback translation.
    const fallbackTranslationsStr: string | undefined =
      this._fallbackTranslations[str];
    if (typeof fallbackTranslationsStr !== 'undefined') {
      return replaceVariables(fallbackTranslationsStr, vars);
    }

    this.emit('notFound', str);
    return;
  }
}
