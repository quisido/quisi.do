import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Search } from './index.js';

describe('Search', (): void => {
  it('should be search', (): void => {
    const { getByRole } = render(
      <Search label="Test search">Test content</Search>,
    );

    getByRole('search', { name: 'Test search' });
  });
});
