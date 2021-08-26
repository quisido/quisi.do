import { init } from '@sentry/react';
import browserTracing from '../constants/browser-tracing';

const SENTRY_KEY = 'a36b53fdd093405eb597a945f49a70f2';
const DSN = `https://${SENTRY_KEY}@o592283.ingest.sentry.io/5740642`;

export default function initSentry(): void {
  init({
    dsn: DSN,
    environment: process.env.NODE_ENV,
    integrations: [browserTracing],
    release: `charlesstover.com@${process.env.npm_package_version ?? '0.0.1'}`,
    tracesSampleRate: 1.0,
  });
}
