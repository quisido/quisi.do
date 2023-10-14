import Locale from '../constants/locale';

interface Params {
  readonly locale: Locale;
}

export default function generateLocaleStaticParams(): readonly Params[] {
  const params: Params[] = [];

  for (const locale of Object.values(Locale)) {
    if (locale === Locale.English) {
      continue;
    }

    params.push({
      locale,
    });
  }

  return params;
}
