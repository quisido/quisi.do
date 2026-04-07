import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { ArticleProps } from '../core/article-props.js';

export default function testArticle(
  Article: ComponentType<ArticleProps>,
): void {
  describe('Article', (): void => {
    it('should be an article', (): void => {
      const { getByRole } = render(
        <Article label="Test article">Test content</Article>,
      );

      getByRole('article', { name: 'Test article' });
    });
  });
}
