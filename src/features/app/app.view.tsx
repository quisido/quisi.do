import FullStory from 'fullstory-react';
import type { ReactElement } from 'react';
import DataDog from 'react-datadog';
import { QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Theme from '../../components/theme';
import GITHUB_SHA from '../../constants/github-sha';
import QUERY_CLIENT from '../../constants/query-client';
import REDUX_STORE from '../../constants/redux-store';
import GoogleAnalytics from '../../modules/react-google-analytics';
import I18nProvider from './components/i18n-provider';
import Routes from './components/routes';
import Sentry from './components/sentry';

/*
The App root component mounts context providers for the whole application.
  Specifically, these providers should allow their values to be dependency-
  injected into unit tests, swapping browser-specific implementations to be
  replaced with Node-friendly alternatives.
*/

export default function App(): ReactElement {
  return (
    <BrowserRouter>
      <DataDog
        applicationId="e29eb164-e193-4380-b512-ebd70bbfaeb6"
        clientToken="pubf0c07bd5003d0c4a65a9f129d9e83a3d"
        env={process.env.NODE_ENV}
        service="charlesstover.com"
        sessionReplayRecording
        version={GITHUB_SHA ?? 'unknown'}
      >
        <FullStory orgId="150TVM">
          <GoogleAnalytics trackingId="UA-5966978-4">
            <QueryClientProvider client={QUERY_CLIENT}>
              <ReduxProvider store={REDUX_STORE}>
                <I18nProvider>
                  <Sentry>
                    <Theme>
                      <Routes />
                    </Theme>
                  </Sentry>
                </I18nProvider>
              </ReduxProvider>
            </QueryClientProvider>
          </GoogleAnalytics>
        </FullStory>
      </DataDog>
    </BrowserRouter>
  );
}
