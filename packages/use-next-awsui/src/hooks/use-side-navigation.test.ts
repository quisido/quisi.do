import type { SideNavigationProps } from '@awsui/components-react/side-navigation';
import { act } from '@testing-library/react';
import type { SideNavigationState } from '../index.js';
import { useSideNavigation } from '../index.js';
import renderHook from '../test/utils/render-hook.js';

const ONCE = 1;
const TEST_HREF = '/test/pathname?test=search#test:hash';
const TEST_TEXT = 'test text';

describe('useSideNavigation', (): void => {
  it('should prefetch', (): void => {
    const { expectToHavePrefetched } = renderHook(useSideNavigation, {
      initialProps: {
        hrefs: ['/one', '/two'],
      },
    });

    expectToHavePrefetched('/one');
    expectToHavePrefetched('/two');
  });

  describe('handleFollow', (): void => {
    describe('external', (): void => {
      it('should not prevent default behavior for external navigation', (): void => {
        const { result } = renderHook<never, SideNavigationState>(
          useSideNavigation,
        );

        const testFollowEvent: CustomEvent<SideNavigationProps.FollowDetail> =
          new CustomEvent<SideNavigationProps.FollowDetail>('', {
            detail: {
              external: true,
              href: TEST_HREF,
              text: TEST_TEXT,
            },
          });
        act((): void => {
          result.current.handleFollow(testFollowEvent);
        });

        expect(testFollowEvent.defaultPrevented).toBe(false);
      });

      it('should not push to history', (): void => {
        const { expectHrefToBe, result } = renderHook(useSideNavigation);

        act((): void => {
          const testFollowEvent: CustomEvent<SideNavigationProps.FollowDetail> =
            new CustomEvent<SideNavigationProps.FollowDetail>('', {
              detail: {
                external: true,
                href: TEST_HREF,
                text: TEST_TEXT,
              },
            });
          result.current.handleFollow(testFollowEvent);
        });

        expectHrefToBe('/');
      });

      it('should not set activeHref', (): void => {
        const { result } = renderHook(useSideNavigation);
        expect(result.current.activeHref).toBe('/');

        act((): void => {
          const testFollowEvent: CustomEvent<SideNavigationProps.FollowDetail> =
            new CustomEvent<SideNavigationProps.FollowDetail>('', {
              detail: {
                external: true,
                href: TEST_HREF,
                text: TEST_TEXT,
              },
            });
          result.current.handleFollow(testFollowEvent);
        });

        expect(result.current.activeHref).toBe('/');
      });
    });

    describe('internal', (): void => {
      it('should prevent default behavior', (): void => {
        const { result } = renderHook<never, SideNavigationState>(
          useSideNavigation,
        );

        const preventDefault = jest.fn();
        const testFollowEvent: CustomEvent<SideNavigationProps.FollowDetail> =
          new CustomEvent<SideNavigationProps.FollowDetail>('', {
            detail: {
              href: TEST_HREF,
              text: TEST_TEXT,
            },
          });
        testFollowEvent.preventDefault = preventDefault;
        act((): void => {
          result.current.handleFollow(testFollowEvent);
        });

        expect(preventDefault).toHaveBeenCalledTimes(ONCE);
        expect(preventDefault).toHaveBeenLastCalledWith();
      });

      it('should push to history', (): void => {
        const { expectHrefToBe, result } = renderHook(useSideNavigation);

        act((): void => {
          const testFollowEvent: CustomEvent<SideNavigationProps.FollowDetail> =
            new CustomEvent<SideNavigationProps.FollowDetail>('', {
              detail: {
                href: TEST_HREF,
                text: TEST_TEXT,
              },
            });
          result.current.handleFollow(testFollowEvent);
        });

        expectHrefToBe(TEST_HREF);
      });

      it('should set activeHref', (): void => {
        const { rerender, result } = renderHook(useSideNavigation);

        expect(result.current.activeHref).toBe('/');

        act((): void => {
          const testFollowEvent: CustomEvent<SideNavigationProps.FollowDetail> =
            new CustomEvent<SideNavigationProps.FollowDetail>('', {
              detail: {
                href: TEST_HREF,
                text: TEST_TEXT,
              },
            });
          result.current.handleFollow(testFollowEvent);
        });

        /**
         *   This re-render should be automatic at runtime, but must be manually
         * called within Jest.
         */
        rerender();

        expect(result.current.activeHref).toBe(TEST_HREF);
      });
    });
  });
});
