import type { ReactElement } from 'react';
import useMuiWrapper from './wrapper.mui.hook';
import Navigation from './wrapper.mui-navigation.view';
import type Props from './types/props';

export default function MuiWrapper({
  children,
}: Readonly<Props>): ReactElement {
  const { handleNavigationClose, handleNavigationOpen, isNavigationOpen } =
    useMuiWrapper();

  return (
    <>
      <Navigation
        onClose={handleNavigationClose}
        onOpen={handleNavigationOpen}
        open={isNavigationOpen}
      />
      {children}
    </>
  );
}
