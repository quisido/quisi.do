import { BrowserTracing } from '@sentry/browser';

export default new BrowserTracing({
  // routingInstrumentation: ROUTING_INSTRUMENTATION,
}) satisfies BrowserTracing;
