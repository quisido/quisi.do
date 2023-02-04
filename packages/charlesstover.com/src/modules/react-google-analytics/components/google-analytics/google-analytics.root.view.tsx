import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';
import findDefined from '../../../../utils/find-defined';
import findUndefined from '../../../../utils/find-undefined';
import GOOGLE_ANALYTICS_WINDOW from '../../constants/google-analytics-window';
import HEAD from '../../constants/head';
import gtag from '../../utils/gtag';
import mapTrackingIdToScriptElement from '../../utils/map-tracking-id-to-script-element';

interface Props {
  readonly children: ReactNode;
  readonly trackingId: string;
}

export default function GoogleAnalytics({
  children,
  trackingId,
}: Readonly<Props>): ReactElement {
  useEffect((): VoidFunction => {
    const script: HTMLScriptElement = mapTrackingIdToScriptElement(trackingId);
    HEAD.appendChild(script);
    return (): void => {
      HEAD.removeChild(script);
    };
  }, [trackingId]);

  useEffect((): VoidFunction | undefined => {
    if (findDefined(GOOGLE_ANALYTICS_WINDOW.dataLayer)) {
      return;
    }

    GOOGLE_ANALYTICS_WINDOW.dataLayer = [];
    return (): void => {
      delete GOOGLE_ANALYTICS_WINDOW.dataLayer;
    };
  }, []);

  useEffect((): VoidFunction | undefined => {
    if (findDefined(GOOGLE_ANALYTICS_WINDOW.gtag)) {
      return;
    }

    GOOGLE_ANALYTICS_WINDOW.gtag = gtag;
    return (): void => {
      delete GOOGLE_ANALYTICS_WINDOW.gtag;
    };
  }, []);

  useEffect((): void => {
    if (findUndefined(GOOGLE_ANALYTICS_WINDOW.gtag)) {
      return;
    }

    GOOGLE_ANALYTICS_WINDOW.gtag('js', new Date());
  }, []);

  useEffect((): void => {
    if (findUndefined(GOOGLE_ANALYTICS_WINDOW.gtag)) {
      return;
    }

    GOOGLE_ANALYTICS_WINDOW.gtag('config', trackingId);
  }, [trackingId]);

  return <>{children}</>;
}
