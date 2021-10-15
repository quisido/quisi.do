import { I18nProvider } from 'lazy-i18n';
import type { ReactElement } from 'react';
import Theme from '../../components/theme';
import Language from '../../constants/language';
import TRANSLATIONS from '../../constants/translations';
import useMain from './app.main.hook';
import Routes from './app.routes.view';

/*
The App main component mounts providers whose states are dependent on the root
  contexts.
*/

export default function AppMain(): ReactElement {
  const { language } = useMain();

  return (
    <I18nProvider
      fallbackLocale={Language.English}
      locale={language}
      translations={TRANSLATIONS}
    >
      <Theme>
        <Routes />
      </Theme>
    </I18nProvider>
  );
}
