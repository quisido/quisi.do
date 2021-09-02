import { reactRouterV5Instrumentation } from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import type { Integration } from '@sentry/types';
import type { History, Location } from 'history';

export default function mapHistoryToBrowserTracing<HistoryLocationState>(
  history: Omit<Readonly<History<HistoryLocationState>>, 'location'> & {
    readonly location: Readonly<Location<HistoryLocationState>>;
  },
): Integration {
  return new Integrations.BrowserTracing({
    routingInstrumentation: reactRouterV5Instrumentation(history),
  });
}
