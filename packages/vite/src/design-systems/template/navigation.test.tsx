import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Navigation } from './index.js';

describe('Navigation', (): void => {
  it('should be navigation', (): void => {
    const { getByRole } = render(
      <Navigation label="Test navigation">Test content</Navigation>,
    );

    getByRole('navigation', { name: 'Test navigation' });
  });
});
