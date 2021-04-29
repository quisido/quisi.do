import '@awsui/global-styles/index.css';
import { init, reactRouterV5Instrumentation } from '@sentry/react';
import { RouterHistory } from '@sentry/react/dist/reactrouter';
import { Integrations } from '@sentry/tracing';
import { render } from 'react-dom';
import App from './components/app';
import history from './constants/history';

const SENTRY_KEY = 'a36b53fdd093405eb597a945f49a70f2';

const browserTracing = new Integrations.BrowserTracing({
  routingInstrumentation: reactRouterV5Instrumentation(
    (history as unknown) as RouterHistory,
  ),
});

init({
  dsn: `https://${SENTRY_KEY}@o592283.ingest.sentry.io/5740642`,
  release: 'charlesstover.com@' + process.env.npm_package_version,
  tracesSampleRate: 1.0,
  integrations: [browserTracing],
});

render(<App />, document.getElementById('root'));
