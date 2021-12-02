import { I18nProvider } from 'lazy-i18n';
import type { ReactElement, ReactNode } from 'react';
import Language from '../../../../constants/language';
import TRANSLATIONS from '../../../../constants/translations';
import useI18nProvider from './app-i18n-provider.hook';

interface Props {
  readonly children: ReactNode;
}

export default function AppI18nProvider({ children }: Props): ReactElement {
  const { language } = useI18nProvider();

  return (
    <I18nProvider
      fallbackLocale={Language.English}
      locale={language}
      translations={TRANSLATIONS}
    >
      {children}
    </I18nProvider>
  );
}
