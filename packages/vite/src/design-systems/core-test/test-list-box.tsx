import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { ListBoxProps } from '../core/list-box-props.js';

export default function testListBox(
  ListBox: ComponentType<ListBoxProps>,
): void {
  describe('ListBox', (): void => {
    it('should be a list box', (): void => {
      const { getByName } = render(
        <ListBox label="Test list box" options={[]} />,
      );

      getByName('listbox', 'Test list box');
    });

    /**
     * DO: "Authors MUST manage focus on this container role."
     * @see {@link https://w3c.github.io/aria/#managingfocus_authors}
     */
  });
}
