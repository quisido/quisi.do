import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Menu, MenuItemRadio } from './index.js';

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
