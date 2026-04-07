import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { SuperscriptProps } from '../core/superscript-props.js';

export default function testSuperscript(
  Superscript: ComponentType<SuperscriptProps>,
): void {
  describe('Superscript', (): void => {
    it('should be a superscript', (): void => {
      const { getByRole } = render(
        <>
          <span id="test-id">Test description</span>
          <Superscript describedBy="test-id">Test superscript</Superscript>
        </>,
      );
      getByRole('superscript', { description: 'Test description' });
    });
  });
}
