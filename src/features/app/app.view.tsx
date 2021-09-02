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
import SENTRY_ORG from '../../constants/sentry-org';
import VERSION from '../../constants/version';
import Monitoring from '../../modules/react-monitoring';
import Main from './app.view.main';

export default function App(): ReactElement {
  return (
    <Monitoring
      environment={process.env.NODE_ENV}
      fullStoryOrgId={FULLSTORY_ORG_ID}
      history={HISTORY}
      sentryDsn={SENTRY_DSN}
      sentryOrg={SENTRY_ORG}
      version={VERSION}
    >
      <Provider store={STORE}>
        <QueryClientProvider client={QUERY_CLIENT}>
          <Router history={HISTORY}>
            <Main />
          </Router>
        </QueryClientProvider>
      </Provider>
    </Monitoring>
  );
}
