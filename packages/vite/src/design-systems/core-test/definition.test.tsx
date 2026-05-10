import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Definition } = await importTestedDesignSystem();

describe('Definition', (): void => {
  it('should be a definition', (): void => {
    const { getByRole } = render(
      <Definition id="test-definition-id">Definition content</Definition>,
    );

    const definition: HTMLElement = getByRole('definition');
    expect(definition).toHaveTextContent('Definition content');
  });

  // TODO: DO NOT use interactive elements such as form controls within a definition.
});
