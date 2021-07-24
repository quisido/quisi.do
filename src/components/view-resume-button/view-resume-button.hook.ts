import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';

interface State {
  iconAlt?: string;
}

export default function useViewResumeButton(): State {
  const translate: TranslateFunction = useTranslate();

  return {
    iconAlt: translate('external'),
  };
}
