import { type Translations } from 'lazy-i18n';
import Locale from '../constants/locale.js';
import english from '../translations/index--en-US.json';

export default {
  [Locale.English]: english,

  [Locale.Arabic]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/index--ar-EG.json'),

  [Locale.Filipino]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/index--fil-PH.json'),

  [Locale.Japanese]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/index--ja-JP.json'),

  [Locale.Spanish]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/index--es-ES.json'),
} satisfies Record<Locale, Translations>;
