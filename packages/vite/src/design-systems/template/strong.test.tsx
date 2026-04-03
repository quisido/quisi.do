import { describe, it } from 'vitest';
import { Strong } from './index.js';
import { render } from '@testing-library/react';

describe('Strong', (): void => {
  it('should be a strong emphasis', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test description</span>
        <Strong describedBy="test-id">Test strong</Strong>
      </>,
    );
    getByRole('strong', { description: 'Test description' });
  });
});
