import { describe, it } from 'vitest';
import { Emphasis } from './index.js';
import { render } from '@testing-library/react';

describe('Emphasis', (): void => {
  it('should emphasize text', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test description</span>
        <Emphasis describedBy="test-id">Test emphasis</Emphasis>
      </>,
    );
    getByRole('emphasis', { description: 'Test description' });
  });
});
