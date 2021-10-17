import type { CSSProperties } from 'react';
import { useCallback, useMemo, useState } from 'react';
import MUI_NAVIGATION_WIDTH from './constants/mui-navigation-width';
import useMuiMobile from './hooks/use-mui-mobile';

interface State {
  readonly handleNavigationClose: () => void;
  readonly handleNavigationOpen: () => void;
  readonly isNavigationOpen: boolean | undefined;
  readonly mainStyle: CSSProperties;
}

const NONE = 0;

export default function useMuiWrapper(): State {
  const isMobile: boolean = useMuiMobile();

  const [isNavigationOpen, setIsNavigationOpen] = useState<
    boolean | undefined
  >();

  return {
    isNavigationOpen,

    handleNavigationClose: useCallback((): void => {
      setIsNavigationOpen(false);
    }, []),

    handleNavigationOpen: useCallback((): void => {
      setIsNavigationOpen(true);
    }, []),

    mainStyle: useMemo(
      (): CSSProperties => ({
        marginLeft: isMobile ? NONE : MUI_NAVIGATION_WIDTH,
      }),
      [isMobile],
    ),
  };
}
