import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { TreeProps } from '../core/tree-props.js';

export default function testTree(Tree: ComponentType<TreeProps>): void {
  describe('Tree', (): void => {
    it('should render a tree', (): void => {
      const { getByName } = render(<Tree caption="Test caption" rows={[]} />);
      getByName('tree', 'Test caption');
    });

    /**
     * TODO: "Authors MUST manage focus on this container role."
     * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
     */
  });
}
