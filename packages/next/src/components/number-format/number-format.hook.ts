import Locale from '../../constants/locale';
import { useLocale } from '../../contexts/locale';

interface State {
  readonly locale: Locale;
}

export default function useNumberFormat(): State {
  const [locale] = useLocale();

  return {
    locale,
  };
}
