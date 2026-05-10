import render from './render.js';
import { describe, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Tree } = await importTestedDesignSystem();

describe('Tree', (): void => {
  it('should render a tree', (): void => {
    const { getByRole } = render(<Tree items={[]} />);
    getByRole('tree');
  });

  /**
   * TODO: "Authors MUST manage focus on this container role."
   * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
   */
});
