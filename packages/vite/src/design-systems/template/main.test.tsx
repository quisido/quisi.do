import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Main } from './index.js';

describe('Main', (): void => {
  it('should be main content', (): void => {
    const { getByRole } = render(<Main label="Test main">Test content</Main>);

    getByRole('main', { name: 'Test main' });
  });
});
