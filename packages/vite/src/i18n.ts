import i18next, { type i18n, type ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';
import Locale from './constants/locale.js';
import { mapObjectToKeys } from 'fmrs';

const LOCALES_RECORD: Record<Locale, true> = {
  [Locale.Arabic]: true,
  [Locale.English]: true,
  [Locale.Spanish]: true,
  [Locale.Filipino]: true,
  [Locale.Japanese]: true,
};

const LOCALES: readonly Locale[] = mapObjectToKeys(LOCALES_RECORD);

/**
 *   Initialize i18next with react-i18next bindings.
 *
 *   Resources are intentionally empty — `lazy-i18n` continues to handle all
 *   translations at runtime. Populating these resources (and switching
 *   components to consume react-i18next) is left for a follow-up commit.
 */
export default function initI18next(locale: Locale): i18n {
  if (!i18next.isInitialized) {
    void i18next.use(initReactI18next).init({
      defaultNS: 'translation',
      fallbackLng: Locale.English,
      interpolation: {
        escapeValue: false,
      },
      lng: locale,
      resources: Object.fromEntries(
        LOCALES.map(
          (supportedLocale: Locale): readonly [Locale, ResourceLanguage] => [
            supportedLocale,
            { translation: {} },
          ],
        ),
      ),
      supportedLngs: LOCALES,
    });
  }

  return i18next;
}
