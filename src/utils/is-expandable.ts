import { SideNavigationProps } from '@awsui/components-react/side-navigation';

export default function isExpandable(
  item: SideNavigationProps.Item,
): item is
  | SideNavigationProps.ExpandableLinkGroup
  | SideNavigationProps.Section {
  return Object.prototype.hasOwnProperty.call(item, 'defaultExpanded');
}
