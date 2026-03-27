import { describe, it } from 'vitest';
import { Insertion } from './index.js';
import { render } from '@testing-library/react';

describe('Insertion', (): void => {
  it('should be an insertion', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test description</span>
        <Insertion describedBy="test-id">Test insertion</Insertion>
      </>,
    );
    getByRole('insertion', { description: 'Test description' });
  });
});
