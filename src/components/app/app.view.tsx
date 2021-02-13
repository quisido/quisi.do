import AwsuiDarkMode from 'awsui-dark-mode';
import { I18nProvider } from 'lazy-i18n';
import { ReactElement } from 'react';
import { useCapsule } from 'react-capsule';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import DarkModeCapsule from '../../capsules/dark-mode';
import LanguageCapsule from '../../capsules/language';
import Language from '../../constants/language';
import TRANSLATIONS from '../../constants/translations';
import Routes from './components/routes.view';

const queryClient: QueryClient = new QueryClient();

export default function App(): ReactElement {
  const [isDarkModeEnabled] = useCapsule(DarkModeCapsule);
  const [language] = useCapsule(LanguageCapsule);

  return (
    <AwsuiDarkMode disabled={!isDarkModeEnabled} root="body">
      <BrowserRouter>
        <I18nProvider
          fallbackLocale={Language.English}
          locale={language}
          translations={TRANSLATIONS}
        >
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </I18nProvider>
      </BrowserRouter>
    </AwsuiDarkMode>
  );
}
