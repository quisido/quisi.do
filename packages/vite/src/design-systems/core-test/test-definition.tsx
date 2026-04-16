import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { DefinitionProps } from '../core/definition-props.js';

export default function testDefinition(
  Definition: ComponentType<DefinitionProps>,
): void {
  describe('Definition', (): void => {
    it('should be a definition', (): void => {
      const { getByRole } = render(
        <Definition id="test-definition-id">Definition content</Definition>,
      );

      const definition: HTMLElement = getByRole('definition');
      expect(definition).toHaveTextContent('Definition content');
    });

<<<<<<< HEAD
    // TODO: DO NOT use interactive elements such as form controls within a definition.
=======
    //  *   DO NOT use interactive elements such as form controls within a definition.
>>>>>>> 2b8f2b12 (add class names)
  });
}
