import { useEffect } from 'react';
import type GoogleAnalyticsWindow from '../types/google-analytics-window.js';

export default function useDataLayer(): void {
  useEffect((): VoidFunction | undefined => {
    const googleAnalyticsWindow: GoogleAnalyticsWindow = window;
    if (typeof googleAnalyticsWindow.dataLayer !== 'undefined') {
      return;
    }

    googleAnalyticsWindow.dataLayer = [];
    return (): void => {
      delete googleAnalyticsWindow.dataLayer;
    };
  }, []);
}
