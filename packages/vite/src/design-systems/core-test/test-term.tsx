import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { DefinitionProps } from '../core/definition-props.js';
import type { TermProps } from '../core/term-props.js';

interface Options {
  readonly Definition: ComponentType<DefinitionProps>;
}

export default function testTerm(
  Term: ComponentType<TermProps>,
  { Definition }: Options,
): void {
  describe('Term', (): void => {
    it('should be a term', (): void => {
      const { getByRole } = render(
        <>
          <Term definitionId="test-id">Test term</Term>
          <Definition id="test-id">Test definition</Definition>
        </>,
      );

      expect(getByRole('term').textContent).toBe('Test term');
    });
  });
}
