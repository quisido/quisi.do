import { type Translations } from 'lazy-i18n';
import Locale from '../constants/locale.js';
import english from '../translations/english.json';

export default {
  [Locale.English]: english,

  [Locale.Arabic]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/arabic.json'),

  [Locale.Filipino]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/cebuano.json'),

  [Locale.Japanese]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/japanese.json'),

  [Locale.Spanish]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/spanish.json'),
} satisfies Record<Locale, Translations>;
