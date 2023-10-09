import { type Event as SentryEvent } from '@sentry/types';
import { useRecordEvent } from 'aws-rum-react';
import { track } from 'mixpanel-browser';
import { useCallback } from 'react';
import { useCaptureEvent } from 'sentry-react';
import EMPTY_OBJECT from '../../modules/react-google-analytics/constants/empty-object';
import usePathname from '../use-pathname';
import useHostname from '../use-hostname';
import createSentryEvent from './utils/create-sentry-event';

type Dimensions = Record<
  number | string,
  boolean | number | string | null | undefined
>;

type EventEmitter = (
  name: string,
  dimensions?: Readonly<Dimensions> | undefined,
) => void;

interface Zaraz {
  readonly track: (
    eventName: string,
    eventProperties?:
      | Record<string, boolean | number | string | null | undefined>
      | undefined,
  ) => void;
}

interface ZarazWindow extends Window {
  readonly zaraz: Zaraz;
}

const hasZaraz = (w: Window): w is ZarazWindow => 'zaraz' in w;

/**
 * Common e-commerce events:
 * https://developers.cloudflare.com/zaraz/web-api/ecommerce/#list-of-supported-events
 * https://developers.cloudflare.com/zaraz/web-api/ecommerce/#list-of-supported-parameters
 *   Product List Viewed
 *   Products Searched
 *   Product Clicked
 *   Product Added
 *   Product Added to Wishlist
 *   Product Removed
 *   Product Viewed
 *   Cart Viewed
 *   Checkout Started
 *   Checkout Step Viewed
 *   Checkout Step Completed
 *   Payment Info Entered
 *   Order Completed
 *   Order Updated
 *   Order Refunded
 *   Order Cancelled
 *   Clicked Promotion
 *   Viewed Promotion
 *   Shipping Info Entered
 */
export default function useEvent(): EventEmitter {
  // Context
  const captureEvent = useCaptureEvent();
  const hostname: string = useHostname();
  const pathname: string = usePathname();
  const recordEvent = useRecordEvent();

  // States
  return useCallback(
    (name: string, dimensions: Readonly<Dimensions> = EMPTY_OBJECT): void => {
      recordEvent(name, dimensions);

      try {
        track(name, dimensions);
      } catch (_err: unknown) {
        // Mixpanel has not finished loading yet.
        // Cannot read properties of undefined (reading '_event_is_disabled')
      }

      if (hasZaraz(window)) {
        window.zaraz.track(name, dimensions);
      }

      const sentryEvent: SentryEvent = createSentryEvent({
        dimensions,
        hostname,
        name,
        pathname,
      });

      captureEvent(sentryEvent);
    },
    [captureEvent, hostname, pathname, recordEvent],
  );
}
