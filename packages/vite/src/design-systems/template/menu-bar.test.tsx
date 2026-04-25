import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { MenuBar, MenuItem } from './index.js';

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
