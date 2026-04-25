import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Article } from './index.js';

describe('Article', (): void => {
  it('should be an article', (): void => {
    const { getByRole } = render(
      <Article label="Test article">Test content</Article>,
    );

    getByRole('article', { name: 'Test article' });
  });
});
