import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ComplementaryProps } from '../core/complementary-props.js';

export default function testComplementary(
  Complementary: ComponentType<ComplementaryProps>,
): void {
  describe('Complementary', (): void => {
    it('should be complementary content', (): void => {
      const { getByRole } = render(<Complementary>Test content</Complementary>);

      expect(getByRole('complementary').textContent).toBe('Test content');
    });
  });
}
