import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { SubscriptProps } from '../core/subscript-props.js';

export default function testSubscript(
  Subscript: ComponentType<SubscriptProps>,
): void {
  describe('Subscript', (): void => {
    it('should be a subscript', (): void => {
      const { getByRole } = render(
        <>
          <span id="test-id">Test description</span>
          <Subscript describedBy="test-id">Test subscript</Subscript>
        </>,
      );
      getByRole('subscript', { description: 'Test description' });
    });
  });
}
