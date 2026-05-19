import Locale from '../constants/locale.js';

const LOCALES = new Set<unknown>(Object.values(Locale));

export default function isLocale(value: unknown): value is Locale {
  return LOCALES.has(value);
}
