import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Box from '../../components/box';
import MUI_MODAL_PROPS from './navigation.constant.mui-modal-props';
import MUI_PAPER_PROPS from './navigation.constant.mui-paper-props';
import useMuiMobileNavigation from './navigation.mui-mobile.hook';
import type Props from './navigation.type.props';

export default function MuiMobileNavigation({
  onClose,
  onOpen,
  open: openProp,
}: Readonly<Props>): ReactElement {
  const {
    ariaLabel,
    disableBackdropTransition,
    open: openState,
  } = useMuiMobileNavigation({
    open: openProp,
  });

  return (
    <nav aria-label={ariaLabel}>
      <SwipeableDrawer
        ModalProps={MUI_MODAL_PROPS}
        PaperProps={MUI_PAPER_PROPS}
        disableBackdropTransition={disableBackdropTransition}
        onClose={onClose}
        onOpen={onOpen}
        open={openState}
        variant="temporary"
      >
        <Box element="h2" margin="medium">
          <I18n>Navigation</I18n>
        </Box>
      </SwipeableDrawer>
    </nav>
  );
}
