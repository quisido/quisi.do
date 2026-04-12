import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { TreeGridProps } from '../core/tree-grid-props.js';

export default function testTreeGrid(
  TreeGrid: ComponentType<TreeGridProps>,
): void {
  describe('TreeGrid', (): void => {
    it('should render a tree grid', (): void => {
      const { getByName } = render(
        <TreeGrid caption="Test caption" rows={[]} />,
      );
      getByName('treegrid', 'Test caption');
    });

    /**
     * TODO: "Authors MUST manage focus on this container role."
     * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
     */
  });
}
