import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { InsertionProps } from '../core/insertion-props.js';

export default function testInsertion(
  Insertion: ComponentType<InsertionProps>,
): void {
  describe('Insertion', (): void => {
    it('should be an insertion', (): void => {
      const { getByRole } = render(<Insertion>Test insertion</Insertion>);
      expect(getByRole('insertion').textContent).toBe('Test insertion');
    });
  });
}
