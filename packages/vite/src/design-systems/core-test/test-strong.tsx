import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { StrongProps } from '../core/strong-props.js';

export default function testStrong(Strong: ComponentType<StrongProps>): void {
  describe('Strong', (): void => {
    it('should be a strong emphasis', (): void => {
      const { getByRole } = render(<Strong>Test strong</Strong>);
      getByRole('strong');
    });
  });
}
