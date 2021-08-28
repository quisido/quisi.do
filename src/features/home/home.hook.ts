import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';

interface State {
  avatarAlt: string | undefined;
}

export default function useHome(): State {
  const translate: TranslateFunction = useTranslate();

  return {
    avatarAlt: translate('Avatar'),
  };
}
