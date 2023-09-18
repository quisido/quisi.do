import Locale from '../constants/locale';

const LOCALES: Set<unknown> = new Set(Object.values(Locale));

export default function isLocale(value: unknown): value is Locale {
  return LOCALES.has(value);
}
