import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Grid, RowGroup } from './index.js';

describe('Grid', (): void => {
  it('should be a grid', (): void => {
    const { getByRole } = render(
      <Grid label="Test grid">
        <RowGroup label="Test row group">&nbsp;</RowGroup>
      </Grid>,
    );

    getByRole('grid', { name: 'Test grid' });
  });

  // TODO: If a caption exists, it must be the first non-generic descendant.
});
