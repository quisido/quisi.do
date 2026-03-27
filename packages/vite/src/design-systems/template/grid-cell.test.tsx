import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { GridCell } from './index.js';

describe('GridCell', (): void => {
  it('should be a grid cell', (): void => {
    const { getByRole } = render(
      <table role="grid">
        <tbody>
          <tr>
            <GridCell>Test grid cell</GridCell>
          </tr>
        </tbody>
      </table>,
    );

    getByRole('gridcell', { name: 'Test grid cell' });
  });
});
