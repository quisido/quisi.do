import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ColumnHeader } from './index.js';

describe('ColumnHeader', (): void => {
  it('should be a column header', (): void => {
    const { getByRole } = render(
      <table>
        <thead>
          <tr>
            <ColumnHeader>Test column header</ColumnHeader>
          </tr>
        </thead>
      </table>,
    );

    getByRole('columnheader', { name: 'Test column header' });
  });
});
