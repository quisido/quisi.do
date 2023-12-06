import { type TranslateFunction, useTranslate } from 'lazy-i18n';

interface State {
  readonly closeText: string | undefined;
}

export default function useMuiBanner(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  return {
    closeText: translate('Close'),
  };
}
