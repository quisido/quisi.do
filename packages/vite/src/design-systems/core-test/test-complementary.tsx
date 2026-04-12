import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ComplementaryProps } from '../core/complementary-props.js';
import render from './render.js';

export default function testComplementary(
  Complementary: ComponentType<ComplementaryProps>,
): void {
  describe('Complementary', (): void => {
    it('should be complementary content', (): void => {
      const { getByRole } = render(<Complementary>Test content</Complementary>);

      const complementary: HTMLElement = getByRole('complementary');
      expect(complementary.textContent).toBe('Test content');
    });
  });
}
