/// <reference types="jest" />
import type { LinkProps } from '@awsui/components-react/link';
import { act } from '@testing-library/react';
import type { LinkState } from '../index.js';
import { useLink } from '../index.js';
import renderHook from '../test/utils/render-hook.js';

const TEST_HREF = '/test/pathname?test=search#test:hash';

describe('useLink', (): void => {
  describe('handleFollow', (): void => {
    describe('external', (): void => {
      it('should not push to history', (): void => {
        const { href, result } = renderHook<never, LinkState>(useLink);

        act((): void => {
          result.current.handleFollow(
            new CustomEvent<LinkProps.FollowDetail>('', {
              detail: {
                external: true,
                href: TEST_HREF,
              },
            }),
          );
        });

        expect(href.current).toBe('/');
      });

      it('should not prevent default behavior', (): void => {
        const { result } = renderHook<never, LinkState>(useLink);

        const testFollowEvent: CustomEvent<LinkProps.FollowDetail> =
          new CustomEvent<LinkProps.FollowDetail>('', {
            detail: {
              external: true,
              href: TEST_HREF,
            },
          });

        act((): void => {
          result.current.handleFollow(testFollowEvent);
        });

        expect(testFollowEvent.defaultPrevented).toBe(false);
      });
    });

    describe('undefined href', (): void => {
      it('should not push to history', (): void => {
        const { href, result } = renderHook<never, LinkState>(useLink);

        act((): void => {
          result.current.handleFollow(
            new CustomEvent<LinkProps.FollowDetail>('', {
              detail: {
                href: undefined,
              },
            }),
          );
        });

        expect(href.current).toBe('/');
      });

      it('should not prevent default behavior', (): void => {
        const { result } = renderHook<never, LinkState>(useLink);

        const testFollowEvent: CustomEvent<LinkProps.FollowDetail> =
          new CustomEvent<LinkProps.FollowDetail>('', {
            detail: {
              href: undefined,
            },
          });
        act((): void => {
          result.current.handleFollow(testFollowEvent);
        });

        expect(testFollowEvent.defaultPrevented).toBe(false);
      });
    });

    describe('string href', (): void => {
      it('should prevent default behavior', (): void => {
        const { result } = renderHook<never, LinkState>(useLink);

        act((): void => {
          result.current.handleFollow(
            new CustomEvent<LinkProps.FollowDetail>('', {
              detail: {
                href: TEST_HREF,
              },
            }),
          );
        });

        // expect(testFollowEvent.defaultPrevented).toBe(true);
      });

      it('should push to history', (): void => {
        const { href, result } = renderHook<never, LinkState>(useLink);

        act((): void => {
          result.current.handleFollow(
            new CustomEvent<LinkProps.FollowDetail>('', {
              detail: {
                href: TEST_HREF,
              },
            }),
          );
        });

        expect(href.current).toBe(TEST_HREF);
      });
    });
  });
});
