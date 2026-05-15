import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { MenuBar } = await importTestedDesignSystem();

describe('MenuBar', (): void => {
  it('should be a menu bar', (): void => {
    const { getByRole } = render(<MenuBar>Test content</MenuBar>);

    const menuBar: HTMLElement = getByRole('menubar');
    expect(menuBar).toHaveTextContent('Test content');
  });

  /**
   * TODO: "Authors MUST manage focus on this container role."
   * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
   */
});
