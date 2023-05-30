import { useEffect } from 'react';
import useDataLayer from '../../hooks/use-data-layer';
import useGTag from '../../hooks/use-gtag';
import useScript from '../../hooks/use-script';
import useUserData from '../../hooks/use-user-data';
import GoogleAnalyticsUserData from '../../types/google-analytics-user-data';
import UserData from '../../types/user-data';
import gtag from '../../utils/gtag';

interface Props {
  readonly trackingId: string;
  readonly userData?: UserData | undefined;
}

export default function useGoogleAnalytics({
  trackingId,
  userData,
}: Readonly<Props>): void {
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
