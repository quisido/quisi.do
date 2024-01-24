import type Locale from '../../constants/locale.js';
import { useLocale } from '../../contexts/locale.js';

interface State {
  readonly locale: Locale;
}

export default function useNumberFormat(): State {
  const [locale] = useLocale();

  return {
    locale,
  };
}
