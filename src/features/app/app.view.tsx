import '@awsui/global-styles/index.css';
import { ErrorBoundary, withProfiler } from '@sentry/react';
import type { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import HISTORY from '../../constants/history';
import STORE from '../../constants/redux-store';
import Main from './app.view.main';

const queryClient: QueryClient = new QueryClient();

function App(): ReactElement {
  return (
    <ErrorBoundary fallback={<>An error occurred.</>}>
      <Provider store={STORE}>
        <QueryClientProvider client={queryClient}>
          <Router history={HISTORY}>
            <Main />
          </Router>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default withProfiler(App);
