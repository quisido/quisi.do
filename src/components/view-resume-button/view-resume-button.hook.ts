import { TranslateFunction, useTranslate } from 'lazy-i18n';

interface State {
  iconAlt?: string;
}

export default function useViewResumeButton(): State {
  const translate: TranslateFunction = useTranslate();

  return {
    iconAlt: translate('external') || undefined,
  };
}
