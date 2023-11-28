import { type Attributes } from 'react';
import ITEMS from '../../../../../constants/navigation-items';
import type Props from '../types/navigation-root-item-props';
import mapItemToRootItemProps from '../utils/map-navigation-item-to-navigation-root-item-props';

const MUI_NAVIGATION_ROOT_ITEM_PROPS: readonly Readonly<
  Props & Required<Attributes>
>[] = ITEMS.map(mapItemToRootItemProps);

export default MUI_NAVIGATION_ROOT_ITEM_PROPS;
