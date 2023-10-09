import { type TranslateFunction, useTranslate } from 'lazy-i18n';

interface State {
  readonly label: string;
}

export default function useDashboardMessageInABottle(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  return {
    label: translate('message in a bottle') ?? '...',
  };
}
