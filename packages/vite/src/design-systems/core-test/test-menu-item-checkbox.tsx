import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MenuItemCheckboxProps } from '../core/menu-item-checkbox-props.js';
import type { MenuProps } from '../core/menu-props.js';

interface Options {
  readonly Menu: ComponentType<MenuProps>;
}

export default function testMenuItemCheckbox(
  MenuItemCheckbox: ComponentType<MenuItemCheckboxProps>,
  { Menu }: Options,
): void {
  describe('MenuItemCheckbox', (): void => {
    it('should be a menu item checkbox', (): void => {
      const { getByRole } = render(
        <Menu label="Test menu">
          <MenuItemCheckbox>Test menu item checkbox</MenuItemCheckbox>
        </Menu>,
      );

      getByRole('menuitemcheckbox', { name: 'Test menu item checkbox' });
    });
  });
}
