import { describe, it } from 'vitest';
import { Deletion } from './index.js';
import { render } from '@testing-library/react';

describe('Deletion', (): void => {
  it('should be a deletion', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test description</span>
        <Deletion describedBy="test-id">Test deletion</Deletion>
      </>,
    );
    getByRole('deletion', { description: 'Test description' });
  });
});
