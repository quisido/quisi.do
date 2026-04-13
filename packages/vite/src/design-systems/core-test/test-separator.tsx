import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { SeparatorProps } from '../core/separator-props.js';

export default function testSeparator(
  Separator: ComponentType<SeparatorProps>,
): void {
  describe('Separator', (): void => {
    it('should be a separator', (): void => {
      const { getByRole } = render(<Separator />);
      getByRole('separator');
    });
  });
}
