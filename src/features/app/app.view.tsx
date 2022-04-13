import FullStory from 'fullstory-react';
import type { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Theme from '../../components/theme';
import GoogleAnalytics from '../../modules/react-google-analytics';
import Contexts from './components/contexts';
import Datadog from './components/datadog';
import I18nProvider from './components/i18n-provider';
import QueryClientProvider from './components/query-client-provider';
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
      <Contexts>
        <Datadog>
          <FullStory orgId="150TVM">
            <GoogleAnalytics trackingId="UA-5966978-4">
              <I18nProvider>
                <QueryClientProvider>
                  <Sentry>
                    <Theme>
                      <Routes />
                    </Theme>
                  </Sentry>
                </QueryClientProvider>
              </I18nProvider>
            </GoogleAnalytics>
          </FullStory>
        </Datadog>
      </Contexts>
    </BrowserRouter>
  );
}
