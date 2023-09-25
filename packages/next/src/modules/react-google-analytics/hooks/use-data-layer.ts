'use client';

import { useEffect } from 'react';
import GoogleAnalyticsWindow from '../types/google-analytics-window';

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
