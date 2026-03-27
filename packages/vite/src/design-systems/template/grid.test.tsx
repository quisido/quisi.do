import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Grid, GridCell, Row, RowGroup } from './index.js';

describe('Grid', (): void => {
  it('should be a grid', (): void => {
    const { getByRole } = render(
      <Grid label="Test grid">
        <RowGroup label="Test row group">
          <Row label="Test row">
            <GridCell>Test grid cell</GridCell>
          </Row>
        </RowGroup>
      </Grid>,
    );

    getByRole('grid', { name: 'Test grid' });
  });
});
