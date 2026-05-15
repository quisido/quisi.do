import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Definition, Term } = await importTestedDesignSystem();

describe('Term', (): void => {
  it('should be a term', (): void => {
    const { getByRole } = render(
      <>
        <Term definitionId="test-term-definition-id">Test term</Term>
        <Definition id="test-term-definition-id">Test definition</Definition>
      </>,
    );

    const term: HTMLElement = getByRole('term');
    expect(term).toHaveTextContent('Test term');
  });
});
