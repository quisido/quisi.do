import type { SideNavigationProps } from '@awsui/components-react/side-navigation';
import expect from 'expect';
import filterSideNavigationItemsByExpandable from './filter-side-navigation-items-by-expandable';

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

describe('filterSideNavigationItemsByExpandable', (): void => {
  it('should be true for expandable link groups and sections', (): void => {
    expect(
      filterSideNavigationItemsByExpandable(TEST_EXPANDABLE_LINK_GROUP),
    ).toBe(true);
    expect(filterSideNavigationItemsByExpandable(TEST_SECTION)).toBe(true);
  });

  it('should be false for dividers, link groups, and links', (): void => {
    expect(filterSideNavigationItemsByExpandable(TEST_DIVIDER)).toBe(false);
    expect(filterSideNavigationItemsByExpandable(TEST_LINK_GROUP)).toBe(false);
    expect(filterSideNavigationItemsByExpandable(TEST_LINK)).toBe(false);
  });
});
