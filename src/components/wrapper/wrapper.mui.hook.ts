import { useCallback, useState } from 'react';

interface State {
  readonly handleNavigationClose: () => void;
  readonly handleNavigationOpen: () => void;
  readonly isNavigationOpen: boolean | undefined;
}

export default function useMuiWrapper(): State {
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
  };
}
