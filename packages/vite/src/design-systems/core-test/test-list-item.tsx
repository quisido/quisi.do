import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { ListItemProps } from '../core/list-item-props.js';
import type { ListProps } from '../core/list-props.js';
import render from './render.js';

interface Options {
  readonly List: ComponentType<ListProps>;
}

export default function testListItem(
  ListItem: ComponentType<ListItemProps>,
  { List }: Options,
): void {
  describe('ListItem', (): void => {
    it('should be a list item', (): void => {
      const { getByRole } = render(
        <List>
          <ListItem>Test list item</ListItem>
        </List>,
      );

      // List items apparently don't have accessible names.
      getByRole('listitem');
    });
  });
}
