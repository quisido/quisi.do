import { init } from '@sentry/react';
import browserTracing from '../constants/browser-tracing';
import VERSION from '../constants/version';

const SENTRY_KEY = 'a36b53fdd093405eb597a945f49a70f2';
const DSN = `https://${SENTRY_KEY}@o592283.ingest.sentry.io/5740642`;

export default function initSentry(): void {
  init({
    dsn: DSN,
    environment: process.env.NODE_ENV,
    integrations: [browserTracing],
    release: VERSION,
    tracesSampleRate: 1.0,
  });
}
