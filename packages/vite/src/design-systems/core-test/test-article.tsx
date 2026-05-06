import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ArticleProps } from '../core/article-props.js';
import render from './render.js';
import expectActiveElementToBe from './expect-active-element-to-be.js';

export default function testArticle(
  Article: ComponentType<ArticleProps>,
): void {
  describe('Article', (): void => {
    it('should support a heading', (): void => {
      const { getByName } = render(
        <Article heading="Heading">Content</Article>,
      );

      getByName('article', 'Heading');
    });

    it('should support an external label', (): void => {
      const { getByName } = render(
        <>
          <span id="test-article-labelled-by">Labelled Article</span>
          <Article labelledBy="test-article-labelled-by">Content</Article>
        </>,
      );

      getByName('article', 'Labelled Article');
    });

    it('should support keyboard navigation', async (): Promise<void> => {
      const { getByName, tab } = render(
        <Article heading="Tabbable" tabbable>
          Content
        </Article>,
      );

      const article: HTMLElement = getByName('article', 'Tabbable');
      await tab();
      expect(article).toHaveFocus();
      expectActiveElementToBe(article);
    });
  });
}
