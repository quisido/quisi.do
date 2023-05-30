import type { ReactElement, ReactNode } from 'react';
import UserData from '../../types/user-data';
import useGoogleAnalytics from './google-analytics.hook';

interface Props {
  readonly children: ReactNode;
  readonly trackingId: string;
  readonly userData?: UserData | undefined;
}

export default function GoogleAnalytics({
  children,
  trackingId,
  userData,
}: Readonly<Props>): ReactElement {
  useGoogleAnalytics({
    trackingId,
    userData,
  });

  return <>{children}</>;
}
