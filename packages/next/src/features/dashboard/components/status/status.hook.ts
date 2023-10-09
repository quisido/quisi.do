import { type TranslateFunction, useTranslate } from 'lazy-i18n';

interface State {
  readonly ciCdAlt: string;
}

export default function useDashboardStatus(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  return {
    ciCdAlt: translate('Continuous integration/deployment status') ?? 'CI/CD',
  };
}
