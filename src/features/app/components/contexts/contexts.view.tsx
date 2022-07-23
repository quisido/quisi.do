import type { PropsWithChildren, ReactElement } from 'react';
import DarkModeContext from '../../../../contexts/dark-mode';
import DesignSystemContext from '../../../../contexts/design-system';
import LanguageContext from '../../../../contexts/language';
import useAppContexts from './contexts.hook';

export default function AppContexts({
  children,
}: Readonly<PropsWithChildren>): ReactElement {
  const { designSystem, isDarkModeEnabled, language } = useAppContexts();

  return (
    <DarkModeContext.Provider value={isDarkModeEnabled}>
      <DesignSystemContext.Provider value={designSystem}>
        <LanguageContext.Provider value={language}>
          {children}
        </LanguageContext.Provider>
      </DesignSystemContext.Provider>
    </DarkModeContext.Provider>
  );
}
