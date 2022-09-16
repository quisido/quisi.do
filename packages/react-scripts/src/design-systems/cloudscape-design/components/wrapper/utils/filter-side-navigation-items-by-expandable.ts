import type { SideNavigationProps } from '@cloudscape-design/components/side-navigation';

export default function filterCloudscapeSideNavigationItemsByExpandable(
  item: SideNavigationProps.Item,
): item is
  | SideNavigationProps.ExpandableLinkGroup
  | SideNavigationProps.Section {
  switch (item.type) {
    case 'expandable-link-group':
    case 'section':
      return true;
    default:
      return false;
  }
}
