import render from './render.js';
import { describe, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { TreeGrid } = await importTestedDesignSystem();

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
