import { type Event as SentryEvent, type EventHint } from '@sentry/core';
import { mapObjectToEntries } from 'fmrs';
import { type FSApi, useFullstory } from 'fullstory-react';
import mixpanelBrowser from 'mixpanel-browser';
import { usePostHog } from 'posthog-js/react';
import { useCallback } from 'react';
import { useDatadogRum } from 'react-datadog';
import { useSentrySdk } from 'sentry-react';
import EMPTY_OBJECT from '../../modules/react-google-analytics/constants/empty-object.js';
import { useNewRelicBrowserAgent } from '../../modules/react-new-relic/index.js';
import type { Dimensions } from '../../types/dimensions.js';
import zarazTrack from '../../utils/zaraz-track.js';
import useHostname from '../use-hostname.js';
import useLogRocket from '../use-log-rocket.js';
import usePathname from '../use-pathname.js';
import createSentryEvent from './utils/create-sentry-event.js';

interface CaptureSentryEventOptions {
  readonly captureEvent: (event: SentryEvent, hint?: EventHint) => string;
  readonly hostname: string;
  readonly pathname: string;
}

type EventEmitter = (name: string, dimensions?: Readonly<Dimensions>) => void;

const captureSentryEvent = (
  name: string,
  dimensions: Readonly<Dimensions>,
  { captureEvent, hostname, pathname }: CaptureSentryEventOptions,
): void => {
  const sentryEvent: SentryEvent = createSentryEvent({
    dimensions,
    hostname,
    name,
    pathname,
  });

  captureEvent(sentryEvent, {
    mechanism: {
      type: 'generic',
    },
  });
};

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

const safeMixpanelBrowserTrack = (
  name: string,
  dimensions: Readonly<Dimensions>,
): void => {
  try {
    mixpanelBrowser.track(name, dimensions);
  } catch (_err: unknown) {
    /**
     * Mixpanel has not finished loading yet.
     * Cannot read properties of undefined (reading '_event_is_disabled')
     */
  }
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
// eslint-disable-next-line max-lines-per-function
export default function useEmit(): EventEmitter {
  // Context
  const { addAction } = useDatadogRum();
  const fullstory: FSApi = useFullstory();
  const hostname: string = useHostname();
  const LogRocket = useLogRocket();
  const newRelicBrowserAgent = useNewRelicBrowserAgent();
  const pathname: string = usePathname();
  const posthog = usePostHog();
  const { captureEvent } = useSentrySdk();

  // States
  return useCallback(
    (name: string, dimensions: Readonly<Dimensions> = EMPTY_OBJECT): void => {
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
      safeMixpanelBrowserTrack(name, dimensions);

      // New Relic
      newRelicBrowserAgent?.recordCustomEvent(name, dimensions);

      // PostHog
      posthog.capture(name, dimensions, {
        skip_client_rate_limiting: true,
      });

      // Sentry
      captureSentryEvent(name, dimensions, {
        captureEvent,
        hostname,
        pathname,
      });

      // Zaraz
      zarazTrack(name, dimensions);
    },
    [
      LogRocket,
      addAction,
      captureEvent,
      fullstory,
      hostname,
      newRelicBrowserAgent,
      pathname,
      posthog,
    ],
  );
}
