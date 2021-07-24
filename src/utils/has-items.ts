import type { SideNavigationProps } from '@awsui/components-react/side-navigation';

export default function hasItems(
  item: SideNavigationProps.Item,
): item is
  | SideNavigationProps.ExpandableLinkGroup
  | SideNavigationProps.LinkGroup
  | SideNavigationProps.Section {
  return Object.prototype.hasOwnProperty.call(item, 'items');
}
