import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { GridProps } from '../core/grid-props.js';

export default function testGrid(Grid: ComponentType<GridProps>): void {
  describe('Grid', (): void => {
    it('should be a grid', (): void => {
      const { getByRole } = render(<Grid caption="Test grid" rows={[]} />);
      getByRole('grid', { name: 'Test grid' });
    });

    // TODO: If a caption exists, it must be the first non-generic descendant.
  });
}
