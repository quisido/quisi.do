import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Definition, Term } = await importTestedDesignSystem();

describe('Definition', (): void => {
  it('should be a definition', (): void => {
    const { getByRole } = render(
      <Definition id="test-definition-id">Definition content</Definition>,
    );

    const definition: HTMLElement = getByRole('definition');
    expect(definition).toHaveTextContent('Definition content');
  });

  it('should be associated with an identified term', (): void => {
    const { getByRole } = render(
      <>
        <Term definitionId="test-definition-id">Test term</Term>
        <Definition id="test-definition-id">Definition content</Definition>
      </>,
    );

    const term: HTMLElement = getByRole('term');
    const definition: HTMLElement = getByRole('definition');
    expect(term).toHaveTextContent('Test term');
    expect(term).toHaveAttribute('aria-details', 'test-definition-id');
    expect(definition).toHaveAttribute('id', 'test-definition-id');
  });

  it('should not put the definition role on an interactive element', (): void => {
    const { getByRole } = render(
      <Definition id="test-definition-id">
        Definition content
        <button type="button">Interactive control</button>
      </Definition>,
    );

    const definition: HTMLElement = getByRole('definition');
    const button: HTMLElement = getByRole('button');
    expect(definition).not.toBe(button);
    expect(definition).not.toHaveAttribute('tabindex');
    expect(definition.matches('button, input, select, textarea')).toBe(false);
    expect(button).toHaveTextContent('Interactive control');
  });
});
