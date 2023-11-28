import { useLayoutEffect } from 'react';
import { useSentrySdk } from 'sentry-react';
import GLOBAL_STYLES from '../constants/global-styles';

export default function useCloudscapeDesignThemeGlobalStyles(): void {
  // Contexts
  const { captureException } = useSentrySdk();

  // Effects
  useLayoutEffect((): VoidFunction => {
    GLOBAL_STYLES.addEventListener('error', captureException);
    GLOBAL_STYLES.mount();

    return (): void => {
      GLOBAL_STYLES.unmount();
      GLOBAL_STYLES.removeEventListener('error', captureException);
    };
  }, [captureException]);
}
