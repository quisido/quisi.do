import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Menu, MenuItemCheckbox } from './index.js';

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
