import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Cell, Row, RowGroup, Table } from './index.js';

describe('Table', (): void => {
  it('should be a table', (): void => {
    const { getByRole } = render(
      <Table label="Test table">
        <RowGroup label="Test row group">
          <Row label="Test row">
            <Cell>Test cell</Cell>
          </Row>
        </RowGroup>
      </Table>,
    );

    getByRole('table', { name: 'Test table' });
  });

  // TODO: If a caption exists, it must be the first non-generic descendant.
});
