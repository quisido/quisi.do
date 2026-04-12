import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MenuBarProps } from '../core/menu-bar-props.js';

export default function testMenuBar(
  MenuBar: ComponentType<MenuBarProps>,
): void {
  describe('MenuBar', (): void => {
    it('should be a menu bar', (): void => {
      const { getByName } = render(
        <MenuBar items={[]} label="Test menu bar" />,
      );

      getByName('menubar', 'Test menu bar');
    });

    /**
     * TODO: "Authors MUST manage focus on this container role."
     * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
     */
  });
}
