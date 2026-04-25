import { describe, it } from 'vitest';
import { Code } from './index.js';
import { render } from '@testing-library/react';

describe('Code', (): void => {
  it('should be code', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test description</span>
        <Code describedBy="test-id">Test code</Code>
      </>,
    );
    getByRole('code', { description: 'Test description' });
  });
});
