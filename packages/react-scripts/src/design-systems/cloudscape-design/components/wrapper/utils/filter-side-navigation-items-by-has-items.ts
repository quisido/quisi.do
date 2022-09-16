import type { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

export default function filterCloudscapeSideNavigationItemsByHasItems(
  item: SideNavigationProps.Item,
): item is
  | SideNavigationProps.ExpandableLinkGroup
  | SideNavigationProps.LinkGroup
  | SideNavigationProps.Section {
  return Object.prototype.hasOwnProperty.call(item, 'items');
}
