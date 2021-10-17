import I18n from 'lazy-i18n';
import type { ReactElement } from 'react';
import Box from '../../components/box';
import type Props from './types/mui-navigation-props';
import useMuiNavigation from './wrapper.mui-navigation.hook';

export default function MuiWrapperNavigation({
  onClose,
  onOpen,
  open,
}: Readonly<Props>): ReactElement {
  const { ariaLabel, Drawer } = useMuiNavigation();

  return (
    <nav aria-label={ariaLabel}>
      <Drawer onClose={onClose} onOpen={onOpen} open={open}>
        <Box element="h2" margin="medium">
          <I18n>Navigation</I18n>
        </Box>
      </Drawer>
    </nav>
  );
}
