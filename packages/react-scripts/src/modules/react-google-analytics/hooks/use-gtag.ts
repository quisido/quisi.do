import { useEffect } from 'react';
import GOOGLE_ANALYTICS_WINDOW from '../constants/google-analytics-window';
import gtag from '../utils/gtag';

export default function useGTag(): void {
  useEffect((): VoidFunction | undefined => {
    if (typeof GOOGLE_ANALYTICS_WINDOW.gtag !== 'undefined') {
      return;
    }

    GOOGLE_ANALYTICS_WINDOW.gtag = gtag;
    return (): void => {
      delete GOOGLE_ANALYTICS_WINDOW.gtag;
    };
  }, []);
}
