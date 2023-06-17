import type { PropsWithChildren, ReactElement } from 'react';
import DarkModeContext from '../../../../contexts/dark-mode';
import DesignSystemContext from '../../../../contexts/design-system';
import Hostname from '../../../../contexts/hostname';
import LanguageContext from '../../../../contexts/language';
import useAppContexts from './contexts.hook';

interface Props {
  readonly hostname: string;
}

export default function AppContexts({
  children,
  hostname,
}: Readonly<PropsWithChildren<Props>>): ReactElement {
  const { designSystem, isDarkModeEnabled, language } = useAppContexts();

  return (
    <DarkModeContext.Provider value={isDarkModeEnabled}>
      <DesignSystemContext.Provider value={designSystem}>
        <Hostname.Provider value={hostname}>
          <LanguageContext.Provider value={language}>
            {children}
          </LanguageContext.Provider>
        </Hostname.Provider>
      </DesignSystemContext.Provider>
    </DarkModeContext.Provider>
  );
}
