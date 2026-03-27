import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Complementary } from './index.js';

describe('Complementary', (): void => {
  it('should be complementary content', (): void => {
    const { getByRole } = render(
      <Complementary label="Test complementary">Test content</Complementary>,
    );

    getByRole('complementary', { name: 'Test complementary' });
  });
});
