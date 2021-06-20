import { Integrations } from '@sentry/tracing';
import routingInstrumentation from '../constants/browser-tracing-routing-instrumentation';

export default new Integrations.BrowserTracing({
  routingInstrumentation,
});
