import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Table } from './index.js';

describe('Table', (): void => {
  it('should be a table', (): void => {
    const { getByRole } = render(<Table caption="Test table" rows={[]} />);

    getByRole('table', { name: 'Test table' });
  });

  // TODO: If a caption exists, it must be the first non-generic descendant.
});
