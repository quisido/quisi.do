import { Integrations } from '@sentry/tracing';
import ROUTING_INSTRUMENTATION from '../constants/routing-instrumentation';

const BROWSER_TRACING_INTEGRATION: Integrations.BrowserTracing =
  new Integrations.BrowserTracing({
    routingInstrumentation: ROUTING_INSTRUMENTATION,
  });

export default BROWSER_TRACING_INTEGRATION;
