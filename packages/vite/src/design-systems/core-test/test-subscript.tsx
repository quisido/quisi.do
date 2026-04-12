import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { SubscriptProps } from '../core/subscript-props.js';

export default function testSubscript(
  Subscript: ComponentType<SubscriptProps>,
): void {
  describe('Subscript', (): void => {
    it('should be a subscript', (): void => {
      const { getByRole } = render(<Subscript>Test subscript</Subscript>);
      getByRole('subscript');
    });
  });
}
