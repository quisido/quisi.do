/// <reference types="jest" />
import { act } from '@testing-library/react';
import type { BreadcrumbGroupState } from '../index.js';
import { useBreadcrumbGroup } from '../index.js';
import mapHrefToBreadcrumbGroupClickEvent from '../test-utils/map-href-to-breadcrumb-group-click-event.js';
import renderHook from '../test-utils/render-hook.js';

const TEST_HREF = '/test/pathname?test=search#test:hash';

describe('useBreadcrumbs', (): void => {
  describe('handleFollow', (): void => {
    it('should prevent default behavior', (): void => {
      const testFollowEvent = mapHrefToBreadcrumbGroupClickEvent(TEST_HREF);
      const { result } = renderHook<never, BreadcrumbGroupState>(
        useBreadcrumbGroup,
      );

      act((): void => {
        result.current.handleFollow(testFollowEvent);
      });

      // expect(testFollowEvent.defaultPrevented).toBe(true);
    });

    it('should push to history', (): void => {
      const { href, result } = renderHook<never, BreadcrumbGroupState>(
        useBreadcrumbGroup,
      );

      act((): void => {
        const testFollowEvent = mapHrefToBreadcrumbGroupClickEvent(TEST_HREF);
        result.current.handleFollow(testFollowEvent);
      });

      expect(href.current).toBe(TEST_HREF);
    });
  });
});
