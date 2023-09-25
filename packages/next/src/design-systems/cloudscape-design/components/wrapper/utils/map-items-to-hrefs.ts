import { SideNavigationProps } from '@cloudscape-design/components';

export default function mapItemsToHrefs(
  items: readonly SideNavigationProps.Item[],
): Set<string> {
  const hrefs: Set<string> = new Set();

  for (const item of items) {
    // LinkGroup has both `href` and `items`.
    if ('href' in item) {
      hrefs.add(item.href);
    }

    if ('items' in item) {
      const itemHrefs: Set<string> = mapItemsToHrefs(item.items);
      for (const itemHref of itemHrefs) {
        hrefs.add(itemHref);
      }
    }
  }

  return hrefs;
}
