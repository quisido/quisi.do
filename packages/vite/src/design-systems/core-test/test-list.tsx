import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ListProps } from '../core/list-props.js';

export default function testList(List: ComponentType<ListProps>): void {
  describe('List', (): void => {
    it('should default to unordered', (): void => {
      const { getByName } = render(<List items={[]} label="unordered list" />);
      const list: HTMLElement = getByName('list', 'unordered list');
      expect(list).toBeInstanceOf(HTMLUListElement);
    });

    it('should support ordered', (): void => {
      const { getByName } = render(
        <List items={[]} label="ordered list" ordered />,
      );

      const list: HTMLElement = getByName('list', 'ordered list');
      expect(list).toBeInstanceOf(HTMLOListElement);
    });
  });
}
