import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MenuItemProps } from '../core/menu-item-props.js';
import type { MenuProps } from '../core/menu-props.js';
import render from './render.js';

interface Options {
  readonly Menu: ComponentType<MenuProps>;
}

export default function testMenuItem(
  MenuItem: ComponentType<MenuItemProps>,
  { Menu }: Options,
): void {
  describe('MenuItem', (): void => {
    it('should be a menu item', (): void => {
      const { getByName } = render(
        <Menu label="Test menu">
          <MenuItem>Test menu item</MenuItem>
        </Menu>,
      );

      getByName('menuitem', 'Test menu item');
    });
  });
}
