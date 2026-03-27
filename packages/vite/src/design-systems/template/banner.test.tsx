import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Banner } from './index.js';

describe('Banner', (): void => {
  it('should be a banner', (): void => {
    const { getByRole } = render(
      <Banner label="Test banner">Test content</Banner>,
    );

    getByRole('banner', { name: 'Test banner' });
  });
});
