import '@awsui/global-styles/index.css';
import { ErrorBoundary, withProfiler } from '@sentry/react';
import type { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import HISTORY from '../../constants/history';
import STORE from '../../constants/redux-store';
import Main from './app.view.main';

interface FallbackRenderParams {
  readonly componentStack: string | null;
  readonly error: Readonly<Error>;
  readonly eventId: string | null;
  readonly resetError: () => void;
}

const queryClient: QueryClient = new QueryClient();

const errorBoundaryFallback = ({
  error,
  resetError,
}: FallbackRenderParams): ReactElement => (
  <>
    <strong>An error occurred while rendering the application:</strong>
    <span>{error.message}</span> <button onClick={resetError}>Retry</button>
  </>
);

function App(): ReactElement {
  return (
    <ErrorBoundary fallback={errorBoundaryFallback}>
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
