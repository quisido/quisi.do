import { type Event as SentryEvent } from '@sentry/types';
import { useRecordEvent } from 'aws-rum-react';
import { track } from 'mixpanel-browser';
import { useCallback } from 'react';
import { useSentrySdk } from 'sentry-react';
import { useHostname } from '../../contexts/hostname.js';
import EMPTY_OBJECT from '../../modules/react-google-analytics/constants/empty-object.js';
import usePathname from '../use-pathname.js';
import createSentryEvent from './utils/create-sentry-event.js';

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

const DEFAULT_METRIC_VALUE = 1;
const hasZaraz = (w: Window): w is ZarazWindow => 'zaraz' in w;

const mapDimensionsToValue = (dimensions: Dimensions): number => {
  if ('value' in dimensions && typeof dimensions['value'] === 'number') {
    return dimensions['value'];
  }
  return DEFAULT_METRIC_VALUE;
}

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
export default function useEmit(): EventEmitter {
  // Context
  const hostname: string = useHostname();
  const pathname: string = usePathname();
  const recordEvent = useRecordEvent();
  const { captureEvent, metrics } = useSentrySdk();

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
      metrics.set(
        name,
        mapDimensionsToValue(dimensions),
        {
          tags: dimensions,
          timestamp: Date.now(),
        },
      );
    },
    [captureEvent, hostname, metrics, pathname, recordEvent],
  );
}
