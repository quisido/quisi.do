import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MathProps } from '../core/math-props.js';

export default function testMath(Math: ComponentType<MathProps>): void {
  describe('Math', (): void => {
    it('should be math', (): void => {
      const { getByRole } = render(<Math label="Test math">1 + 1 = 2</Math>);

      getByRole('math', { name: 'Test math' });
    });
  });
}
