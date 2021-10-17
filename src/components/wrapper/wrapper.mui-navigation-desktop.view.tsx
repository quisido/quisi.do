import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import type { PropsWithChildren, ReactElement } from 'react';
import PAPER_PROPS from './constants/mui-navigation-paper-props';
import type Props from './types/mui-navigation-props';

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));

export default function DesktopMuiNavigation({
  children,
  onClose,
  open,
}: Readonly<PropsWithChildren<Props>>): ReactElement {
  return (
    <StyledDrawer
      PaperProps={PAPER_PROPS}
      onClose={onClose}
      open={open ?? true}
      variant="permanent"
    >
      {children}
    </StyledDrawer>
  );
}
