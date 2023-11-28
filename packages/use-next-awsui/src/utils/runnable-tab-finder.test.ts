import type { TabsProps } from '@awsui/components-react/tabs';
import RunnableTabFinder from './runnable-tab-finder.js';

const TEST_HASH = '#test:hash';
const TEST_PATHNAME = '/test/pathname';
const TEST_SEARCH = '?test=search';
const TEST_HREF = `${TEST_PATHNAME}${TEST_SEARCH}${TEST_HASH}`;

const TEST_EMPTY_TAB: TabsProps.Tab = {
  id: 'test-empty',
  label: 'Test empty',
};

const TEST_HASH_TAB: TabsProps.Tab = {
  href: `/${TEST_HASH}`,
  id: 'test-hash',
  label: 'Test hash',
};

const TEST_HREF_TAB: TabsProps.Tab = {
  href: TEST_HREF,
  id: 'test-href',
  label: 'Test href',
};

const TEST_PATHNAME_TAB: TabsProps.Tab = {
  href: TEST_PATHNAME,
  id: 'test-pathname',
  label: 'Test pathname',
};

const TEST_SEARCH_TAB: TabsProps.Tab = {
  href: `/${TEST_SEARCH}`,
  id: 'test-search',
  label: 'Test search',
};

const TEST_TABS: TabsProps.Tab[] = [
  TEST_EMPTY_TAB,
  TEST_HREF_TAB,
  TEST_PATHNAME_TAB,
  TEST_SEARCH_TAB,
  TEST_HASH_TAB,
];

describe('RunnableTabFinder', (): void => {
  it('should find tabs with the specified href', (): void => {
    const tabFinder: RunnableTabFinder = new RunnableTabFinder()
      .setHash(TEST_HASH)
      .setPathname(TEST_PATHNAME)
      .setSearch(TEST_SEARCH);
    expect(TEST_TABS.find(tabFinder.run.bind(tabFinder))).toBe(TEST_HREF_TAB);
  });

  it('should find tabs with the specified hash', (): void => {
    const tabFinder: RunnableTabFinder = new RunnableTabFinder().setHash(
      TEST_HASH,
    );
    expect(TEST_TABS.find(tabFinder.run.bind(tabFinder))).toBe(TEST_HASH_TAB);
  });

  it('should find tabs with the specified pathname', (): void => {
    const tabFinder: RunnableTabFinder = new RunnableTabFinder().setPathname(
      TEST_PATHNAME,
    );
    expect(TEST_TABS.find(tabFinder.run.bind(tabFinder))).toBe(
      TEST_PATHNAME_TAB,
    );
  });

  it('should find tabs with the specified search', (): void => {
    const tabFinder: RunnableTabFinder = new RunnableTabFinder().setSearch(
      TEST_SEARCH,
    );
    expect(TEST_TABS.find(tabFinder.run.bind(tabFinder))).toBe(TEST_SEARCH_TAB);
  });
});
