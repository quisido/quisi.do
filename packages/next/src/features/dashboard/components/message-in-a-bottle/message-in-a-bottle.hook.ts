import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';

interface State {
  readonly alt: string;
  readonly title: string;
}

export default function useDashboardMessageInABottle(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  return {
    alt: translate('message in a bottle') ?? '...',
    title: translate('message in a bottle') ?? '...',
  };
}
