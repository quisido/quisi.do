import { type Attributes } from 'react';
import type Category from '../../../../../types/navigation-category';
import type Component from '../../../../../types/navigation-component';
import type ExternalLink from '../../../../../types/navigation-external-link';
import type Link from '../../../../../types/navigation-link';
import type RootItemProps from '../types/navigation-root-item-props';

const LAST_INDEX_OFFSET = -1;

export default function mapNavigationItemToMuiNavigationRootItemProps(
  item: Category | Component | ExternalLink | Link,
  index: number,
  items: readonly (Category | Component | ExternalLink | Link)[],
): Required<Attributes> & RootItemProps {
  const itemsCount: number = items.length;
  const lastNavigationItemsIndex: number = itemsCount + LAST_INDEX_OFFSET;
  return {
    divider: index !== lastNavigationItemsIndex,
    item,
    key: index,
  };
}
