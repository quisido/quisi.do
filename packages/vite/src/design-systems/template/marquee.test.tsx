import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Marquee } from './index.js';

describe('Marquee', (): void => {
  it('should be a marquee', (): void => {
    const { getByRole } = render(
      <Marquee label="Test marquee">Test content</Marquee>,
    );

    getByRole('marquee', { name: 'Test marquee' });
  });
});
