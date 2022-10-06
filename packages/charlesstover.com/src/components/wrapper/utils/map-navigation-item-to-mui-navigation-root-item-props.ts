import type { Attributes } from 'react';
import type RootItemProps from '../types/mui-navigation-root-item-props';
import type NavigationCategory from '../types/navigation-category';
import type NavigationComponent from '../types/navigation-component';
import type NavigationExternalLink from '../types/navigation-external-link';
import type NavigationLink from '../types/navigation-link';

const LAST_INDEX_OFFSET = -1;

export default function mapNavigationItemToMuiNavigationRootItemProps(
  item:
    | NavigationCategory
    | NavigationComponent
    | NavigationExternalLink
    | NavigationLink,
  index: number,
  items: readonly (
    | NavigationCategory
    | NavigationComponent
    | NavigationExternalLink
    | NavigationLink
  )[],
): Required<Attributes> & RootItemProps {
  const itemsCount: number = items.length;
  const lastNavigationItemsIndex: number = itemsCount + LAST_INDEX_OFFSET;
  return {
    divider: index !== lastNavigationItemsIndex,
    item,
    key: index,
  };
}
