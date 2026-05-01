import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { FeedProps } from '../core/feed-props.js';

export default function testFeed(Feed: ComponentType<FeedProps>): void {
  describe('Feed', (): void => {
    it('should support labelled by', (): void => {
      const { getByName } = render(
        <>
          <span id="test-feed-label-id">Test labelled by</span>
          <Feed articles={[]} labelledBy="test-feed-label-id" />
        </>,
      );

      getByName('feed', 'Test labelled by');
    });

    // TODO: The feed also lets authors inform assistive technologies when additions and removals are occurring so assistive technologies can more reliably update their reading view without disrupting reading or degrading performance.

    // TODO: Authors SHOULD provide keyboard commands for moving focus among articles in a feed so users who do not utilize an assistive technology that provides article navigation features can use the keyboard to navigate the feed.

    // TODO: Test aria-busy when articles are appending or prepending

    describe('articles', (): void => {
      it('should be focusable', (): void => {
        // TODO
      });
    });
  });
}
