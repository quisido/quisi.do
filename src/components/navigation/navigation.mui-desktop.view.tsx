import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Box from '../../components/box';
import MUI_PAPER_PROPS from './navigation.constant.mui-paper-props';
import useMuiDesktopNavigation from './navigation.mui-desktop.hook';
import type Props from './navigation.type.props';

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));

export default function MuiDesktopNavigation({
  onClose,
  open: openProp,
}: Readonly<Props>): ReactElement {
  const { ariaLabel, open: openState } = useMuiDesktopNavigation({
    open: openProp,
  });

  return (
    <nav aria-label={ariaLabel}>
      <StyledDrawer
        PaperProps={MUI_PAPER_PROPS}
        onClose={onClose}
        open={openState}
        variant="permanent"
      >
        <Box element="h2" margin="medium">
          <I18n>Navigation</I18n>
        </Box>
      </StyledDrawer>
    </nav>
  );
}
