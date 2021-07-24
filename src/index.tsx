import '@awsui/global-styles/index.css';
import { init } from '@sentry/react';
import { render } from 'react-dom';
import App from './components/app';
import browserTracing from './constants/browser-tracing';

const SENTRY_KEY = 'a36b53fdd093405eb597a945f49a70f2';

init({
  dsn: `https://${SENTRY_KEY}@o592283.ingest.sentry.io/5740642`,
  release: `charlesstover.com@${process.env.npm_package_version ?? '0.0.1'}`,
  tracesSampleRate: 1.0,
  integrations: [browserTracing],
});

render(<App />, document.getElementById('root'));
