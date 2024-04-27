import { type Event as SentryEvent } from '@sentry/types';
import { useRecordEvent } from 'aws-rum-react';
import { useFullstory, type FSApi } from 'fullstory-react';
import { track } from 'mixpanel-browser';
import { useDatadogRum } from 'react-datadog';
import { useSentrySdk } from 'sentry-react';
import { useHostname } from '../../contexts/hostname.js';
import EMPTY_OBJECT from '../../modules/react-google-analytics/constants/empty-object.js';
import mapObjectToEntries from '../../utils/map-object-to-entries.js';
import useEffectEvent from '../use-effect-event.js';
import useLogRocket from '../use-log-rocket.js';
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

const removeNullValues = <K extends number | string | symbol, V>(
  record: Record<K, V | null | undefined>,
): Record<K, V | undefined> => {
  const newRecord: Record<K, V | undefined> = {} as Record<K, V | undefined>;
  for (const [key, value] of mapObjectToEntries(record)) {
    if (value === null) {
      newRecord[key] = undefined;
      continue;
    }
    newRecord[key] = value;
  }
  return newRecord;
};

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
  const fullstory: FSApi = useFullstory();
  const hostname: string = useHostname();
  const pathname: string = usePathname();
  const recordEvent = useRecordEvent();
  const LogRocket = useLogRocket();
  const { captureEvent, metrics } = useSentrySdk();
  const { addAction } = useDatadogRum();

  // States
  return useEffectEvent(
    (name: string, dimensions: Readonly<Dimensions> = EMPTY_OBJECT): void => {
      // CloudWatch RUM
      recordEvent(name, dimensions);

      // Datadog
      addAction(name, dimensions);

      // Fullstory
      fullstory('trackEvent', {
        name,
        properties: dimensions,
      });

      // LogRocket
      LogRocket.track(name, removeNullValues(dimensions));

      // Mixpanel
      try {
        track(name, dimensions);
      } catch (_err: unknown) {
        /*
         * Mixpanel has not finished loading yet.
         * Cannot read properties of undefined (reading '_event_is_disabled')
         */
      }

      // Sentry
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

      // Zaraz
      if (hasZaraz(window)) {
        window.zaraz.track(name, dimensions);
      }
    },
  );
}
