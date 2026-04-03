import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Complementary } from './index.js';

describe('Complementary', (): void => {
  it('should be complementary content', (): void => {
    const { getByRole } = render(<Complementary>Test content</Complementary>);

    expect(getByRole('complementary').textContent).toBe('Test content');
  });
});
