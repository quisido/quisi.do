import { ErrorBoundary, withProfiler } from '@sentry/react';
import AwsuiDarkMode from 'awsui-dark-mode';
import { I18nProvider } from 'lazy-i18n';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router';
import Routes from '../../components/routes';
import HISTORY from '../../constants/history';
import Language from '../../constants/language';
import TRANSLATIONS from '../../constants/translations';
import useDarkMode from '../../hooks/use-dark-mode';
import useLanguage from '../../hooks/use-language';

const queryClient: QueryClient = new QueryClient();

function App(): ReactElement {
  const [isDarkModeEnabled] = useDarkMode();
  const [language] = useLanguage();

  return (
    <ErrorBoundary fallback="An error occurred.">
      <AwsuiDarkMode disabled={!isDarkModeEnabled} root="body">
        <I18nProvider
          fallbackLocale={Language.English}
          locale={language}
          translations={TRANSLATIONS}
        >
          <QueryClientProvider client={queryClient}>
            <Router history={HISTORY}>
              {/* <Router history={history}> */}
              <Routes />
              {/* </Router> */}
            </Router>
          </QueryClientProvider>
        </I18nProvider>
      </AwsuiDarkMode>
    </ErrorBoundary>
  );
}

export default withProfiler(App);
