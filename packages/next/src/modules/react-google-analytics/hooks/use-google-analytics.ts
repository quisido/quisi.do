'use client';

import { useEffect } from 'react';
import type GoogleAnalyticsUserData from '../types/google-analytics-user-data';
import type UserData from '../types/user-data';
import gtag from '../utils/gtag';
import useDataLayer from './use-data-layer';
import useGTag from './use-gtag';
import useScript from './use-script';
import useUserData from './use-user-data';

interface Props {
  readonly trackingId: string;
  readonly userData?: UserData | undefined;
}

export default function useGoogleAnalytics({
  trackingId,
  userData,
}: Props): void {
  // States
  const googleAnalyticsUserData: GoogleAnalyticsUserData | undefined =
    useUserData(userData);

  // Effects
  useScript(trackingId);
  useDataLayer();
  useGTag();

  useEffect((): void => {
    gtag('js', new Date());
  }, []);

  useEffect((): void => {
    gtag('config', trackingId);
  }, [trackingId]);

  useEffect((): void => {
    if (typeof googleAnalyticsUserData === 'undefined') {
      return;
    }

    gtag('set', 'user_data', googleAnalyticsUserData);
  }, [googleAnalyticsUserData]);
}
