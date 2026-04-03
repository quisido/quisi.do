import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Menu, MenuItem } from './index.js';

describe('Menu', (): void => {
  it('should be a menu', (): void => {
    const { getByRole } = render(
      <Menu label="Test menu">
        <MenuItem>Test menu item</MenuItem>
      </Menu>,
    );

    getByRole('menu', { name: 'Test menu' });
  });
});
