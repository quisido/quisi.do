import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MenuItemRadioProps } from '../core/menu-item-radio-props.js';
import type { MenuProps } from '../core/menu-props.js';

interface Options {
  readonly Menu: ComponentType<MenuProps>;
}

export default function testMenuItemRadio(
  MenuItemRadio: ComponentType<MenuItemRadioProps>,
  { Menu }: Options,
): void {
  describe('MenuItemRadio', (): void => {
    it('should be a menu item radio', (): void => {
      const { getByName } = render(
        <Menu label="Test menu">
          <MenuItemRadio>Test menu item radio</MenuItemRadio>
        </Menu>,
      );

      getByName('menuitemradio', 'Test menu item radio');
    });
  });
}
