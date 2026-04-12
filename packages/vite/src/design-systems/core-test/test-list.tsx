import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ListItemProps } from '../core/list-item-props.js';
import type { ListProps } from '../core/list-props.js';

interface Options {
  readonly ListItem: ComponentType<ListItemProps>;
}

export default function testList(
  List: ComponentType<ListProps>,
  { ListItem }: Options,
): void {
  describe('List', (): void => {
    it('should default to unordered', (): void => {
      const { getByName } = render(
        <List label="unordered list">
          <ListItem>Test unordered list item</ListItem>
        </List>,
      );
      const list: HTMLElement = getByName('list', 'unordered list');
      expect(list).toBeInstanceOf(HTMLUListElement);
    });

    it('should support ordered', (): void => {
      const { getByName } = render(
        <List label="ordered list" ordered>
          <ListItem>Test ordered list item</ListItem>
        </List>,
      );
      const list: HTMLElement = getByName('list', 'ordered list');
      expect(list).toBeInstanceOf(HTMLOListElement);
    });
  });
}
