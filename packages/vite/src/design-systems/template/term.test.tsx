import { describe, it } from 'vitest';
import { Term } from './index.js';
import { render } from '@testing-library/react';

describe('Term', (): void => {
  it('should be a term', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test description</span>
        <Term describedBy="test-id">Test term</Term>
      </>,
    );
    getByRole('term', { description: 'Test description' });
  });
});
