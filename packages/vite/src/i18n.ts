import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Locale from './constants/locale.js';

const FALLBACK_LOCALE: Locale = Locale.English;

const SUPPORTED_LOCALES: readonly Locale[] = [
  Locale.Arabic,
  Locale.English,
  Locale.Spanish,
  Locale.Filipino,
  Locale.Japanese,
];

/**
 *   Initialize i18next with react-i18next bindings.
 *
 *   Resources are intentionally empty — `lazy-i18n` continues to handle all
 *   translations at runtime. Populating these resources (and switching
 *   components to consume react-i18next) is left for a follow-up commit.
 */
await i18next.use(initReactI18next).init({
  defaultNS: 'translation',
  fallbackLng: FALLBACK_LOCALE,
  interpolation: {
    escapeValue: false,
  },
  lng: FALLBACK_LOCALE,
  resources: Object.fromEntries(
    SUPPORTED_LOCALES.map((locale: Locale) => [
      locale,
      { translation: {} },
    ]),
  ),
  supportedLngs: SUPPORTED_LOCALES,
});

export default i18next;
