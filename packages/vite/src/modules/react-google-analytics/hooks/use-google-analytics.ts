import { useEffect } from 'react';
import type GoogleAnalyticsUserData from '../types/google-analytics-user-data.js';
import type UserData from '../types/user-data.js';
import gtag from '../utils/gtag.js';
import useDataLayer from './use-data-layer.js';
import useGTag from './use-gtag.js';
import useScript from './use-script.js';
import useUserData from './use-user-data.js';

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
