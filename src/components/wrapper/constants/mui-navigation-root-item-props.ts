import type { Attributes } from 'react';
import NAVIGATION_ITEMS from '../constants/navigation-items';
import type Props from '../types/mui-navigation-root-item-props';
import mapNavigationItemToRootItemProps from '../utils/map-navigation-item-to-mui-navigation-root-item-props';

const MUI_NAVIGATION_ROOT_ITEM_PROPS: readonly Readonly<
  Props & Required<Attributes>
>[] = NAVIGATION_ITEMS.map(mapNavigationItemToRootItemProps);

export default MUI_NAVIGATION_ROOT_ITEM_PROPS;
