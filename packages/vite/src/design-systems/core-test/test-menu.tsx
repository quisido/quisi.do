import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MenuProps } from '../core/menu-props.js';

export default function testMenu(Menu: ComponentType<MenuProps>): void {
  describe('Menu', (): void => {
    it('should be a menu', (): void => {
      const { getByName } = render(<Menu items={[]} label="Test menu" />);

      getByName('menu', 'Test menu');
    });

    /**
     * DO: "Authors MUST manage focus on this container role."
     * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
     */
  });
}
