import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MenuItemProps } from '../core/menu-item-props.js';
import type { MenuProps } from '../core/menu-props.js';

interface Options {
  readonly MenuItem: ComponentType<MenuItemProps>;
}

export default function testMenu(
  Menu: ComponentType<MenuProps>,
  { MenuItem }: Options,
): void {
  describe('Menu', (): void => {
    it('should be a menu', (): void => {
      const { getByName } = render(
        <Menu label="Test menu">
          <MenuItem>Test menu item</MenuItem>
        </Menu>,
      );

      getByName('menu', 'Test menu');
    });
  });
}
