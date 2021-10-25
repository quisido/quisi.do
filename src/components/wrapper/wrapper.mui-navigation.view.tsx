import List from '@mui/material/List';
import type { ReactElement } from 'react';
import mapComponentToPropMapper from '../../utils/map-component-to-prop-mapper';
import ROOT_ITEM_PROPS from './constants/mui-navigation-root-item-props';
import type Props from './types/mui-navigation-props';
import useMuiNavigation from './wrapper.mui-navigation.hook';
import RootItem from './wrapper.mui-navigation-root-item.view';

const mapRootItemPropsToElement = mapComponentToPropMapper(RootItem);

export default function MuiWrapperNavigation({
  onClose,
  onOpen,
  open,
}: Readonly<Props>): ReactElement {
  const { Drawer, ariaLabel } = useMuiNavigation();

  return (
    <nav aria-label={ariaLabel}>
      <Drawer onClose={onClose} onOpen={onOpen} open={open}>
        <List>{ROOT_ITEM_PROPS.map(mapRootItemPropsToElement)}</List>
      </Drawer>
    </nav>
  );
}
