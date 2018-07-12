import { type Translations } from 'lazy-i18n';
import Locale from '../constants/locale.js';
import english from '../translations/en-US.json';

export default {
  [Locale.English]: english,

  [Locale.Arabic]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/ar-EG.json'),

  [Locale.Filipino]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/fil-PH.json'),

  [Locale.Japanese]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/ja-JP.json'),

  [Locale.Spanish]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/es-ES.json'),
} satisfies Record<Locale, Translations>;
