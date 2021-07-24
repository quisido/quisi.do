import AwsuiDarkMode from 'awsui-dark-mode';
import { I18nProvider } from 'lazy-i18n';
import type { ReactElement } from 'react';
import Routes from '../../components/routes';
import Language from '../../constants/language';
import TRANSLATIONS from '../../constants/translations';
import useLanguage from '../../hooks/use-language';
import useDarkMode from '../../hooks/use-dark-mode';

export default function AppMain(): ReactElement {
  const isDarkModeEnabled: boolean = useDarkMode();
  const language: Language = useLanguage();

  return (
    <AwsuiDarkMode disabled={!isDarkModeEnabled} root="body">
      <I18nProvider
        fallbackLocale={Language.English}
        locale={language}
        translations={TRANSLATIONS}
      >
        <Routes />
      </I18nProvider>
    </AwsuiDarkMode>
  );
}
