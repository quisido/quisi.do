import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MenuItemProps } from '../core/menu-item-props.js';
import type { MenuProps } from '../core/menu-props.js';

interface Options {
  readonly Menu: ComponentType<MenuProps>;
}

export default function testMenuItem(
  MenuItem: ComponentType<MenuItemProps>,
  { Menu }: Options,
): void {
  describe('MenuItem', (): void => {
    it('should be a menu item', (): void => {
      const { getByRole } = render(
        <Menu label="Test menu">
          <MenuItem>Test menu item</MenuItem>
        </Menu>,
      );

      getByRole('menuitem', { name: 'Test menu item' });
    });
  });
}
