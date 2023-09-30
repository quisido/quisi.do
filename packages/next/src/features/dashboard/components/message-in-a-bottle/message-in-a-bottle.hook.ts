import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';

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
