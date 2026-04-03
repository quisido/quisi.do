import { describe, it } from 'vitest';
import { Superscript } from './index.js';
import { render } from '@testing-library/react';

describe('Superscript', (): void => {
  it('should be a superscript', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test description</span>
        <Superscript describedBy="test-id">Test superscript</Superscript>
      </>,
    );
    getByRole('superscript', { description: 'Test description' });
  });
});
