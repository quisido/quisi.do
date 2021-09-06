import AwsuiDarkMode from 'awsui-dark-mode';
import { I18nProvider } from 'lazy-i18n';
import type { ReactElement } from 'react';
import Language from '../../constants/language';
import TRANSLATIONS from '../../constants/translations';
import useMain from './app.view.main.hook';
import Routes from './app.view.routes';

/*
The App main component mounts providers whose states are dependent on the root
  contexts.
*/

export default function AppMain(): ReactElement {
  const { isDarkModeEnabled, language } = useMain();

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
