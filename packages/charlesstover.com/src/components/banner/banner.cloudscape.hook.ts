import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';

interface State {
  readonly dismissAriaLabel: string | undefined;
}

export default function useCloudscapeBanner(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  return {
    dismissAriaLabel: translate('Dismiss'),
  };
}
