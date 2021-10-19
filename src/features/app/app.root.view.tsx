import FullStory from 'fullstory-react';
import type { ReactElement } from 'react';
import DataDog from 'react-datadog';
import { QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router';
import Sentry from 'sentry-react';
import Theme from '../../components/theme';
import HISTORY from '../../constants/history';
import QUERY_CLIENT from '../../constants/query-client';
import REDUX_STORE from '../../constants/redux-store';
import SENTRY_INTEGRATIONS from '../../constants/sentry-integrations';
import VERSION from '../../constants/version';
import GoogleAnalytics from '../../modules/react-google-analytics';
import I18nProvider from './app.i18n-provider.view';
import Routes from './app.routes.view';

/*
The App root component mounts context providers for the whole application.
  Specifically, these providers should allow their values to be dependency-
  injected into unit tests, swapping browser-specific implementations to be
  replaced with Node-friendly alternatives.
*/

export default function App(): ReactElement {
  return (
    <DataDog
      applicationId="e29eb164-e193-4380-b512-ebd70bbfaeb6"
      clientToken="pubf0c07bd5003d0c4a65a9f129d9e83a3d"
      env={process.env.NODE_ENV}
      service="charlesstover.com"
      sessionReplayRecording
      version={VERSION}
    >
      <FullStory orgId="150TVM">
        <GoogleAnalytics trackingId="UA-5966978-4">
          <QueryClientProvider client={QUERY_CLIENT}>
            <ReduxProvider store={REDUX_STORE}>
              <I18nProvider>
                <Router history={HISTORY}>
                  <Sentry
                    dsn="https://a36b53fdd093405eb597a945f49a70f2@o592283.ingest.sentry.io/5740642"
                    environment={process.env.NODE_ENV}
                    integrations={SENTRY_INTEGRATIONS}
                    release={VERSION}
                  >
                    <Theme>
                      <Routes />
                    </Theme>
                  </Sentry>
                </Router>
              </I18nProvider>
            </ReduxProvider>
          </QueryClientProvider>
        </GoogleAnalytics>
      </FullStory>
    </DataDog>
  );
}
