import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import type { PropsWithChildren, ReactElement } from 'react';
import DISABLE_BACKDROP_TRANSITION from '../../constants/disable-mobile-mui-navigation-backdrop-transition';
import MODAL_PROPS from '../../constants/mui-navigation-modal-props';
import PAPER_PROPS from '../../constants/mui-navigation-paper-props';
import type Props from '../../types/mui-navigation-props';

export default function MobileMuiNavigation({
  children,
  onClose,
  onOpen,
  open = false,
}: Readonly<PropsWithChildren<Props>>): ReactElement {
  return (
    <SwipeableDrawer
      ModalProps={MODAL_PROPS}
      PaperProps={PAPER_PROPS}
      disableBackdropTransition={DISABLE_BACKDROP_TRANSITION}
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      variant="temporary"
    >
      {children}
    </SwipeableDrawer>
  );
}
