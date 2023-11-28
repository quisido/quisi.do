import { type SideNavigationProps } from '@awsui/components-react/side-navigation';
import filterAwsuiSideNavigationItemsByHasItems from './filter-side-navigation-items-by-has-items';

const TEST_DIVIDER: SideNavigationProps.Divider = {
  type: 'divider',
};

const TEST_EXPANDABLE_LINK_GROUP: SideNavigationProps.ExpandableLinkGroup = {
  href: '/test/href',
  items: [],
  text: 'test text',
  type: 'expandable-link-group',
};

const TEST_LINK: SideNavigationProps.Link = {
  href: '/test/href',
  text: 'test text',
  type: 'link',
};

const TEST_LINK_GROUP: SideNavigationProps.LinkGroup = {
  href: '/test/href',
  items: [],
  text: 'test text',
  type: 'link-group',
};

const TEST_SECTION: SideNavigationProps.Section = {
  items: [],
  text: 'test text',
  type: 'section',
};

describe('filterAwsuiSideNavigationItemsByHasItems', (): void => {
  it('should be true for link groups and sections', (): void => {
    expect(
      filterAwsuiSideNavigationItemsByHasItems(TEST_EXPANDABLE_LINK_GROUP),
    ).toBe(true);
    expect(filterAwsuiSideNavigationItemsByHasItems(TEST_LINK_GROUP)).toBe(
      true,
    );
    expect(filterAwsuiSideNavigationItemsByHasItems(TEST_SECTION)).toBe(true);
  });

  it('should be false for dividers and links', (): void => {
    expect(filterAwsuiSideNavigationItemsByHasItems(TEST_DIVIDER)).toBe(false);
    expect(filterAwsuiSideNavigationItemsByHasItems(TEST_LINK)).toBe(false);
  });
});
