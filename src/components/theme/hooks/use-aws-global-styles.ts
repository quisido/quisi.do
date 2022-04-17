import { useLayoutEffect } from 'react';
import { useCaptureException } from 'sentry-react';
import AWSUI_GLOBAL_STYLES from '../constants/awsui-global-styles';

export default function useAwsThemeGlobalStyles(): void {
  const captureException = useCaptureException();

  useLayoutEffect((): VoidFunction => {
    AWSUI_GLOBAL_STYLES.addEventListener('error', captureException);
    AWSUI_GLOBAL_STYLES.mount();

    return (): void => {
      AWSUI_GLOBAL_STYLES.unmount();
      AWSUI_GLOBAL_STYLES.removeEventListener('error', captureException);
    };
  }, [captureException]);
}
