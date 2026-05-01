import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { ArticleProps } from '../core/article-props.js';
import render from './render.js';

export default function testArticle(
  Article: ComponentType<ArticleProps>,
): void {
  describe('Article', (): void => {
    it('should support a heading', (): void => {
      const { getByName } = render(
        <Article heading="Test heading">Test content</Article>,
      );

      getByName('article', 'Test heading');
    });

    it('should support an external label', (): void => {
      const { getByName } = render(
        <>
          <span id="test-article-labelled-by">Test label</span>
          <Article heading="Test heading">Test content</Article>
        </>,
      );

      getByName('article', 'Test label');
    });
  });
}
