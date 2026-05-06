import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
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
        const { getByName } = render(
          <>
            <span id="test-feed-label-id">Test feed</span>
            <Feed
              articles={[
                {
                  children: 'First content',
                  heading: 'First article',
                  key: 'first',
                },
              ]}
              labelledBy="test-feed-label-id"
            />
          </>,
        );

        const article: HTMLElement = getByName('article', 'First article');
        expect(article).toHaveAttribute('tabindex', '0');
      });

      it('should support position in set and set size', (): void => {
        const { getByName } = render(
          <>
            <span id="test-feed-label-id">Test feed</span>
            <Feed
              articles={[
                {
                  children: 'First content',
                  heading: 'First article',
                  key: 'first',
                },
                {
                  children: 'Second content',
                  heading: 'Second article',
                  key: 'second',
                },
              ]}
              articlesOffset={2}
              labelledBy="test-feed-label-id"
              setSize={5}
            />
          </>,
        );

        const first: HTMLElement = getByName('article', 'First article');
        const second: HTMLElement = getByName('article', 'Second article');
        expect(first).toHaveAttribute('aria-posinset', '3');
        expect(first).toHaveAttribute('aria-setsize', '5');
        expect(second).toHaveAttribute('aria-posinset', '4');
        expect(second).toHaveAttribute('aria-setsize', '5');
      });
    });
  });
}
