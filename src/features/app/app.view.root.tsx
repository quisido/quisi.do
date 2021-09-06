import '@awsui/global-styles/index.css';
import type { ReactElement } from 'react';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import FULLSTORY_ORG_ID from '../../constants/fullstory-org-id';
import HISTORY from '../../constants/history';
import QUERY_CLIENT from '../../constants/query-client';
import STORE from '../../constants/redux-store';
import SENTRY_DSN from '../../constants/sentry-dsn';
import SENTRY_INTEGRATIONS from '../../constants/sentry-integrations';
import SENTRY_ORG from '../../constants/sentry-org';
import VERSION from '../../constants/version';
import FullStory from '../../modules/react-fullstory';
import Sentry from '../../modules/react-sentry';
import Main from './app.view.main';

/*
The App root component mounts context providers for the whole application.
  Specifically, these providers should allow their values to be dependency-
  injected into unit tests, swapping browser-specific implementations to be
  replaced with Node-friendly alternatives.
*/

export default function App(): ReactElement {
  return (
    <FullStory orgId={FULLSTORY_ORG_ID}>
      <Provider store={STORE}>
        <QueryClientProvider client={QUERY_CLIENT}>
          <Router history={HISTORY}>
            <Sentry
              dsn={SENTRY_DSN}
              environment={process.env.NODE_ENV}
              integrations={SENTRY_INTEGRATIONS}
              org={SENTRY_ORG}
              release={VERSION}
            >
              <Main />
            </Sentry>
          </Router>
        </QueryClientProvider>
      </Provider>
    </FullStory>
  );
}
