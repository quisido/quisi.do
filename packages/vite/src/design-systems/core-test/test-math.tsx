import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { MathProps } from '../core/math-props.js';

export default function testMath(Math: ComponentType<MathProps>): void {
  describe('Math', (): void => {
    it('should be math', (): void => {
      const { getByRole } = render(<Math>1 + 1 = 2</Math>);
      const math: HTMLElement = getByRole('math');
      expect(math).toHaveTextContent('1 + 1 = 2');
    });
  });
}
