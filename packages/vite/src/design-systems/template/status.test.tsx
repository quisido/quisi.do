import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Status } from './index.js';

describe('Status', (): void => {
  it('should be status', (): void => {
    const { getByRole } = render(
      <Status label="Test status">Test content</Status>,
    );

    getByRole('status', { name: 'Test status' });
  });
});
