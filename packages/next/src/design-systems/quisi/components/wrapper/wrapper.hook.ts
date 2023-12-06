'use client';

import { type CSSProperties, useCallback, useMemo, useState } from 'react';
import NAVIGATION_WIDTH from './constants/navigation-width';
import useMobile from './hooks/use-mobile';

interface State {
  readonly handleNavigationClose: VoidFunction;
  readonly handleNavigationOpen: VoidFunction;
  readonly isNavigationOpen: boolean | undefined;
  readonly mainStyle: CSSProperties | undefined;
}

export default function useMuiWrapper(): State {
  const isMobile: boolean = useMobile();

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

    mainStyle: useMemo((): CSSProperties | undefined => {
      if (isMobile) {
        return;
      }

      return {
        marginLeft: NAVIGATION_WIDTH,
        paddingLeft: '60px',
        paddingRight: '60px',
      };
    }, [isMobile]),
  };
}
