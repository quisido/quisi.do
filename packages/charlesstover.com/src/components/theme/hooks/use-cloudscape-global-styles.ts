import { useLayoutEffect } from 'react';
import { useCaptureException } from 'sentry-react';
import CLOUDSCAPE_GLOBAL_STYLES from '../constants/cloudscape-global-styles';

export default function useCloudscapeThemeGlobalStyles(): void {
  const captureException = useCaptureException();

  useLayoutEffect((): VoidFunction => {
    CLOUDSCAPE_GLOBAL_STYLES.addEventListener('error', captureException);
    CLOUDSCAPE_GLOBAL_STYLES.mount();

    return (): void => {
      CLOUDSCAPE_GLOBAL_STYLES.unmount();
      CLOUDSCAPE_GLOBAL_STYLES.removeEventListener('error', captureException);
    };
  }, [captureException]);
}
