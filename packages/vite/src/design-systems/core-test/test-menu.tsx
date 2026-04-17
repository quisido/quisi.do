import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { MenuProps } from '../core/menu-props.js';

export default function testMenu(Menu: ComponentType<MenuProps>): void {
  describe('Menu', (): void => {
    it('should be a menu', (): void => {
      const { getByRole } = render(
        <Menu items={[{ children: 'Test menu item', key: 1 }]} />,
      );

      const menu: HTMLElement = getByRole('menu');
      expect(menu).toHaveTextContent('Test menu item');
    });

    /**
     * DO: "Authors MUST manage focus on this container role."
     * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
     */
  });
}
