import { describe, it } from 'vitest';
import { Mark } from './index.js';
import { render } from '@testing-library/react';

describe('Mark', (): void => {
  it('should mark text', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test description</span>
        <Mark describedBy="test-id">Test mark</Mark>
      </>,
    );
    getByRole('mark', { description: 'Test description' });
  });
});
