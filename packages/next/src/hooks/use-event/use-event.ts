import type { Event as SentryEvent } from '@sentry/types';
import { useRecordEvent } from 'aws-rum-react';
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
