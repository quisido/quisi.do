import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MathProps } from '../core/math-props.js';

export default function testMath(Math: ComponentType<MathProps>): void {
  describe('Math', (): void => {
    it('should be math', (): void => {
      const { getByName } = render(<Math label="Test math">1 + 1 = 2</Math>);
      getByName('math', 'Test math');
    });
  });
}
