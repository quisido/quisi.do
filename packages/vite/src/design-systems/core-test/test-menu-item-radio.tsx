import { render } from '@testing-library/react';
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
      const { getByRole } = render(
        <Menu label="Test menu">
          <MenuItemRadio>Test menu item radio</MenuItemRadio>
        </Menu>,
      );

      getByRole('menuitemradio', { name: 'Test menu item radio' });
    });
  });
}
