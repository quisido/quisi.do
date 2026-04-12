import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';

export default function testSeparator(Separator: ComponentType): void {
  describe('Separator', (): void => {
    it('should be a separator', (): void => {
      const { getByRole } = render(<Separator />);
      getByRole('separator');
    });
  });
}
