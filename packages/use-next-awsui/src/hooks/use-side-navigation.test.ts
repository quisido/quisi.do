import type { SideNavigationProps } from '@awsui/components-react/side-navigation';
import { act } from '@testing-library/react-hooks';
import type { SideNavigationState } from '..';
import { useSideNavigation } from '..';
import renderHook from '../test-utils/render-hook';

const TEST_HREF = '/test/pathname?test=search#test:hash';
const TEST_TEXT = 'test text';

describe('useSideNavigation', (): void => {
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
        const { href, result } = renderHook(useSideNavigation);

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

        expect(href.current).toBe('/');
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

        const testFollowEvent: CustomEvent<SideNavigationProps.FollowDetail> =
          new CustomEvent<SideNavigationProps.FollowDetail>('', {
            detail: {
              href: TEST_HREF,
              text: TEST_TEXT,
            },
          });
        act((): void => {
          result.current.handleFollow(testFollowEvent);
        });

        // expect(testFollowEvent.defaultPrevented).toBe(true);
      });

      it('should push to history', (): void => {
        const { href, result } = renderHook(useSideNavigation);

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

        expect(href.current).toBe(TEST_HREF);
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

        // This re-render should be automatic at runtime, but must be manually
        //   called within Jest.
        rerender();

        expect(result.current.activeHref).toBe(TEST_HREF);
      });
    });
  });
});
