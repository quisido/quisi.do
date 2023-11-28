import Locale from '../constants/locale';

const locales: readonly Locale[] = Object.values(Locale);

export default function isLocalePath(path: string): boolean {
  for (const locale of locales) {
    // Paths should not start with `en-US`.
    if (locale === Locale.English) {
      continue;
    }

    if (path.startsWith(`/${locale}/`)) {
      return true;
    }
  }

  return false;
}
