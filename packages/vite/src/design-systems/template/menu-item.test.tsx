import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Menu, MenuItem } from './index.js';

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
