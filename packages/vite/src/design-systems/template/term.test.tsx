import { describe, it } from 'vitest';
import { Definition, Term } from './index.js';
import { render } from '@testing-library/react';

describe('Term', (): void => {
  it('should be a term', (): void => {
    const { getByRole } = render(
      <>
        <Term definitionId="test-id">Test term</Term>
        <Definition id="test-id">Test definition</Definition>
      </>,
    );
    getByRole('term', { description: 'Test description' });
  });
});
