import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Directory } from './index.js';

describe('Directory', (): void => {
  it('should be a directory', (): void => {
    const { getByRole } = render(
      <Directory label="Test directory">
        <li>Test item</li>
      </Directory>,
    );

    getByRole('directory', { name: 'Test directory' });
  });
});
