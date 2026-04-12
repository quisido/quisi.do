import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { GridProps } from '../core/grid-props.js';

export default function testGrid(Grid: ComponentType<GridProps>): void {
  describe('Grid', (): void => {
    it('should be a grid', (): void => {
      const { getByName } = render(<Grid caption="Test grid" rows={[]} />);
      getByName('grid', 'Test grid');
    });

    // TODO: If a caption exists, it must be the first non-generic descendant.
  });
}
