import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Cell, Row, RowGroup } from './index.js';

describe('RowGroup', (): void => {
  it('should be a row group', (): void => {
    const { getByRole } = render(
      <table>
        <RowGroup label="Test row group">
          <Row label="Test row">
            <Cell>Test cell</Cell>
          </Row>
        </RowGroup>
      </table>,
    );

    getByRole('rowgroup', { name: 'Test row group' });
  });
});
