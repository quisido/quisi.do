import Drawer from '@mui/material/Drawer';
import { type PropsWithChildren, type ReactElement } from 'react';
import PAPER_PROPS from '../../constants/navigation-paper-props';
import type Props from '../../types/navigation-props';

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
