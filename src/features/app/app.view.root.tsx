import '@awsui/global-styles/index.css';
import type { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router';
import Sentry from 'sentry-react';
import DATADOG_APPLICATION_ID from '../../constants/datadog-application-id';
import DATADOG_CLIENT_TOKEN from '../../constants/datadog-client-token';
import DATADOG_SERVICE from '../../constants/datadog-service';
import FULLSTORY_ORG_ID from '../../constants/fullstory-org-id';
import HISTORY from '../../constants/history';
import QUERY_CLIENT from '../../constants/query-client';
import STORE from '../../constants/redux-store';
import SENTRY_DSN from '../../constants/sentry-dsn';
import SENTRY_INTEGRATIONS from '../../constants/sentry-integrations';
import VERSION from '../../constants/version';
import DataDog from '../../modules/react-datadog';
import FullStory from '../../modules/react-fullstory';
import GoogleAnalytics from '../../modules/react-google-analytics';
import Main from './app.view.main';

/*
The App root component mounts context providers for the whole application.
  Specifically, these providers should allow their values to be dependency-
  injected into unit tests, swapping browser-specific implementations to be
  replaced with Node-friendly alternatives.
*/

export default function App(): ReactElement {
  return (
    <DataDog
      applicationId={DATADOG_APPLICATION_ID}
      clientToken={DATADOG_CLIENT_TOKEN}
      env={process.env.NODE_ENV}
      service={DATADOG_SERVICE}
      sessionReplayRecording
      version={VERSION}
    >
      <FullStory orgId={FULLSTORY_ORG_ID}>
        <GoogleAnalytics trackingId="UA-5966978-4">
          <QueryClientProvider client={QUERY_CLIENT}>
            <ReduxProvider store={STORE}>
              <Router history={HISTORY}>
                <Sentry
                  dsn={SENTRY_DSN}
                  environment={process.env.NODE_ENV}
                  integrations={SENTRY_INTEGRATIONS}
                  release={VERSION}
                >
                  <Main />
                </Sentry>
              </Router>
            </ReduxProvider>
          </QueryClientProvider>
        </GoogleAnalytics>
      </FullStory>
    </DataDog>
  );
}
