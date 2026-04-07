import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MenuBarProps } from '../core/menu-bar-props.js';
import type { MenuItemProps } from '../core/menu-item-props.js';

interface Options {
  readonly MenuItem: ComponentType<MenuItemProps>;
}

export default function testMenuBar(
  MenuBar: ComponentType<MenuBarProps>,
  { MenuItem }: Options,
): void {
  describe('MenuBar', (): void => {
    it('should be a menu bar', (): void => {
      const { getByRole } = render(
        <MenuBar label="Test menu bar">
          <MenuItem>Test menu item</MenuItem>
        </MenuBar>,
      );

      getByRole('menubar', { name: 'Test menu bar' });
    });
  });
}
