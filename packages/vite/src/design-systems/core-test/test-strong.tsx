import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { StrongProps } from '../core/strong-props.js';

export default function testStrong(Strong: ComponentType<StrongProps>): void {
  describe('Strong', (): void => {
    it('should be a strong emphasis', (): void => {
      const { getByRole } = render(
        <>
          <span id="test-id">Test description</span>
          <Strong describedBy="test-id">Test strong</Strong>
        </>,
      );
      getByRole('strong', { description: 'Test description' });
    });
  });
}
