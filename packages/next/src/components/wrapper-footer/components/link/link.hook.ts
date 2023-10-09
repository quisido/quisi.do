import { type TranslateFunction, useTranslate } from 'lazy-i18n';
import VERSION from '../../../../constants/version';

interface State {
  readonly title: string | undefined;
}

export default function useWrapperFooterLink(): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  return {
    title: translate('version: $version', {
      version: VERSION,
    }),
  };
}
