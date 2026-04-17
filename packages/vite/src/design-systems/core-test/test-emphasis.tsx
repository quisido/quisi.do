import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { EmphasisProps } from '../core/emphasis-props.js';

export default function testEmphasis(
  Emphasis: ComponentType<EmphasisProps>,
): void {
  describe('Emphasis', (): void => {
    it('should emphasize text', (): void => {
      const { getByRole } = render(<Emphasis>Test emphasis</Emphasis>);
      const emphasis: HTMLElement = getByRole('emphasis');
      expect(emphasis).toHaveTextContent('Test emphasis');
    });
  });
}
