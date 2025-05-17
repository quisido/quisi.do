import { type Translations } from 'lazy-i18n';
import Locale from '../constants/locale.js';
export default {
  [Locale.English]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/authn-errors--en-US.json'),

  [Locale.Arabic]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/authn-errors--ar-EG.json'),

  [Locale.Filipino]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/authn-errors--fil-PH.json'),

  [Locale.Japanese]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/authn-errors--ja-JP.json'),

  [Locale.Spanish]: async (): Promise<{ default: Record<string, string> }> =>
    import('../translations/authn-errors--es-ES.json'),
} satisfies Record<Locale, Translations>;
