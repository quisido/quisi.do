import type { NonCancelableCustomEvent } from '@awsui/components-react/interfaces';
import type { TabsProps } from '@awsui/components-react/tabs';
import { act } from '@testing-library/react-hooks';
import { useTabs } from '..';
import mapHrefToTabsChangeEvent from '../test-utils/map-href-to-tabs-change-event';
import renderHook from '../test-utils/render-hook';

const ONCE = 1;
const TEST_HREF = '/test/pathname?test=search#test:hash';
const TEST_ID = 'test-id';
const TEST_LABEL = 'Test label';

describe('useTabs', (): void => {
  it('should scroll into view', (): void => {
    const { navigate, rerender, result } = renderHook(useTabs, {
      initialProps: {
        tabs: [
          {
            href: TEST_HREF,
            id: TEST_ID,
            label: TEST_LABEL,
          },
        ],
      },
    });

    const MOCK_SCROLL_INTO_VIEW = jest.fn();
    const MOCK_DIV: HTMLDivElement = document.createElement('div');
    MOCK_DIV.scrollIntoView = MOCK_SCROLL_INTO_VIEW;
    result.current.ref.current = MOCK_DIV;

    act((): void => {
      navigate(TEST_HREF);
    });

    // This re-render should be automatic at runtime, but must be manually
    //   called within Jest.
    rerender();

    // Jest's `scrollIntoView` broke during a major version upgrade.
    expect(MOCK_SCROLL_INTO_VIEW).toHaveBeenCalledTimes(ONCE);
  });

  describe('activeTabId', (): void => {
    it('should be any matching tab ID', (): void => {
      const { result } = renderHook(useTabs, {
        initialHref: TEST_HREF,
        initialProps: {
          tabs: [
            {
              href: TEST_HREF,
              id: TEST_ID,
              label: TEST_LABEL,
            },
          ],
        },
      });

      expect(result.current.activeTabId).toBe(TEST_ID);
    });

    it('should be defaultActiveTabId', (): void => {
      const { result } = renderHook(useTabs, {
        initialProps: {
          defaultActiveTabId: TEST_ID,
        },
      });

      expect(result.current.activeTabId).toBe(TEST_ID);
    });
  });

  describe('handleChange', (): void => {
    it('should push to history if href is present', (): void => {
      const { href, result } = renderHook(useTabs);

      act((): void => {
        const testChangeEvent: NonCancelableCustomEvent<TabsProps.ChangeDetail> =
          mapHrefToTabsChangeEvent(TEST_HREF);
        result.current.handleChange(testChangeEvent);
      });

      expect(href.current).toBe(TEST_HREF);
    });

    it('should not push to history if href is not present', (): void => {
      const { href, result } = renderHook(useTabs);

      act((): void => {
        const testChangeEvent: NonCancelableCustomEvent<TabsProps.ChangeDetail> =
          mapHrefToTabsChangeEvent();
        result.current.handleChange(testChangeEvent);
      });

      expect(href.current).toBe('/');
    });
  });
});
