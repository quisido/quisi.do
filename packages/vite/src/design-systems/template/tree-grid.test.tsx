import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { GridCell, Row, RowGroup, TreeGrid } from './index.js';

describe('TreeGrid', (): void => {
  it('should be a tree grid', (): void => {
    const { getByRole } = render(
      <TreeGrid label="Test tree grid">
        <RowGroup label="Test row group">
          <Row label="Test row">
            <GridCell>Test grid cell</GridCell>
          </Row>
        </RowGroup>
      </TreeGrid>,
    );

    getByRole('treegrid', { name: 'Test tree grid' });
  });
});
