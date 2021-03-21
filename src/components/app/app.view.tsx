import AwsuiDarkMode from 'awsui-dark-mode';
import { I18nProvider } from 'lazy-i18n';
import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../../components/routes';
import Language from '../../constants/language';
import TRANSLATIONS from '../../constants/translations';
import useDarkMode from '../../hooks/use-dark-mode';
import useLanguage from '../../hooks/use-language';

const queryClient: QueryClient = new QueryClient();

export default function App(): ReactElement {
  const [isDarkModeEnabled] = useDarkMode();
  const [language] = useLanguage();

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
