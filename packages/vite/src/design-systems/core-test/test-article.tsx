import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { ArticleProps } from '../core/article-props.js';
import render from './render.js';

export default function testArticle(
  Article: ComponentType<ArticleProps>,
): void {
  describe('Article', (): void => {
    it('should be an article', (): void => {
      const { getByName } = render(
        <Article label="Test article">Test content</Article>,
      );

      getByName('article', 'Test article');
    });
  });
}
