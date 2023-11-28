/// <reference types="jest" />
import { act } from '@testing-library/react';
import type { BreadcrumbGroupState } from '../index.js';
import { useBreadcrumbGroup } from '../index.js';
import mapHrefToBreadcrumbGroupClickEvent from '../test/utils/map-href-to-breadcrumb-group-click-event.js';
import renderHook from '../test/utils/render-hook.js';

const ONCE = 1;
const TEST_HREF = '/test/pathname?test=search#test:hash';

describe('useBreadcrumbs', (): void => {
  it('should prefetch paths', (): void => {
    const { expectToHavePrefetched } = renderHook(useBreadcrumbGroup, {
      initialProps: ['/one', '/two'],
    });

    expectToHavePrefetched('/one');
    expectToHavePrefetched('/two');
  });

  describe('handleFollow', (): void => {
    it('should prevent default behavior', (): void => {
      const preventDefault = jest.fn();
      const testFollowEvent = mapHrefToBreadcrumbGroupClickEvent(TEST_HREF);

      const { result } = renderHook<never, BreadcrumbGroupState>(
        useBreadcrumbGroup,
      );

      testFollowEvent.preventDefault = preventDefault;
      act((): void => {
        result.current.handleFollow(testFollowEvent);
      });

      expect(preventDefault).toHaveBeenCalledTimes(ONCE);
      expect(preventDefault).toHaveBeenLastCalledWith();
    });

    it('should push to history', (): void => {
      const { expectHrefToBe, result } = renderHook<
        never,
        BreadcrumbGroupState
      >(useBreadcrumbGroup);

      act((): void => {
        const testFollowEvent = mapHrefToBreadcrumbGroupClickEvent(TEST_HREF);
        result.current.handleFollow(testFollowEvent);
      });

      expectHrefToBe(TEST_HREF);
    });
  });
});
