import { describe, it } from 'vitest';
import { Subscript } from './index.js';
import { render } from '@testing-library/react';

describe('Subscript', (): void => {
  it('should be a subscript', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test description</span>
        <Subscript describedBy="test-id">Test subscript</Subscript>
      </>,
    );
    getByRole('subscript', { description: 'Test description' });
  });
});
