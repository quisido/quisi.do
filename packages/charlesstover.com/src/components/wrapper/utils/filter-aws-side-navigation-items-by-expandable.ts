import type { SideNavigationProps } from '@awsui/components-react/side-navigation';

export default function filterAwsSideNavigationItemsByExpandable(
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
