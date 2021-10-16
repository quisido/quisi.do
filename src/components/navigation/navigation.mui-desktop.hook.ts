import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';

interface Props {
  readonly open: boolean | undefined;
}

interface State {
  readonly ariaLabel: string | undefined;
  readonly open: boolean;
}

export default function useMuiDesktopNavigation({
  open,
}: Readonly<Props>): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  return {
    ariaLabel: translate('Main navigation'),
    open: open ?? true,
  };
}
