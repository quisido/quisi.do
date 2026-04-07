import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { DefinitionProps } from '../core/definition-props.js';

export default function testDefinition(
  Definition: ComponentType<DefinitionProps>,
): void {
  describe('Definition', (): void => {
    it('should be a definition', (): void => {
      const { getByRole } = render(
        <Definition id="test-id">Definition content</Definition>,
      );

      expect(getByRole('definition').textContent).toBe('Definition content');
    });
  });
}
