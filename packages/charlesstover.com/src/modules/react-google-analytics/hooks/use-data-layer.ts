import { useEffect } from 'react';
import GOOGLE_ANALYTICS_WINDOW from '../constants/google-analytics-window';

export default function useDataLayer(): void {
  useEffect((): VoidFunction | undefined => {
    if (typeof GOOGLE_ANALYTICS_WINDOW.dataLayer !== 'undefined') {
      return;
    }

    GOOGLE_ANALYTICS_WINDOW.dataLayer = [];
    return (): void => {
      delete GOOGLE_ANALYTICS_WINDOW.dataLayer;
    };
  }, []);
}
