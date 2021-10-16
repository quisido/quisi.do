import type { TranslateFunction } from 'lazy-i18n';
import { useTranslate } from 'lazy-i18n';

interface Props {
  readonly open: boolean | undefined;
}

interface State {
  readonly ariaLabel: string | undefined;
  readonly disableBackdropTransition: boolean;
  readonly open: boolean;
}

// iOS is hosted on high-end devices. We can enable the backdrop transition
//   without dropping frames. The performance will be good enough.
const iOS: boolean =
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

export default function useMuiMobileNavigation({
  open,
}: Readonly<Props>): State {
  // Contexts
  const translate: TranslateFunction = useTranslate();

  return {
    ariaLabel: translate('Main navigation'),
    disableBackdropTransition: !iOS,
    open: open ?? false,
  };
}
