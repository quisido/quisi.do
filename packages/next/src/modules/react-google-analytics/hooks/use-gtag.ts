'use client';

import { useEffect } from 'react';
import type GoogleAnalyticsWindow from '../types/google-analytics-window';
import gtag from '../utils/gtag';

export default function useGTag(): void {
  useEffect((): VoidFunction | undefined => {
    const googleAnalyticsWindow: GoogleAnalyticsWindow = window;
    if (typeof googleAnalyticsWindow.gtag !== 'undefined') {
      return;
    }

    googleAnalyticsWindow.gtag = gtag;
    return (): void => {
      delete googleAnalyticsWindow.gtag;
    };
  }, []);
}
