import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { DeletionProps } from '../core/deletion-props.js';

export default function testDeletion(
  Deletion: ComponentType<DeletionProps>,
): void {
  describe('Deletion', (): void => {
    it('should be a deletion', (): void => {
      const { getByRole } = render(<Deletion>Test deletion</Deletion>);
      const deletion: HTMLElement = getByRole('deletion');
      expect(deletion.textContent).toBe('Test deletion');
    });
  });
}
