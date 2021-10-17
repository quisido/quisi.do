import Drawer from '@mui/material/Drawer';
import type { PropsWithChildren, ReactElement } from 'react';
import PAPER_PROPS from './constants/mui-navigation-paper-props';
import type Props from './types/mui-navigation-props';

export default function DesktopMuiNavigation({
  children,
  onClose,
  open = true,
}: Readonly<PropsWithChildren<Props>>): ReactElement {
  return (
    <Drawer
      PaperProps={PAPER_PROPS}
      onClose={onClose}
      open={open}
      variant="permanent"
    >
      {children}
    </Drawer>
  );
}
