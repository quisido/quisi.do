import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { List } = await importTestedDesignSystem();

describe('List', (): void => {
  it('should contain list items', (): void => {
    const { getByName, getRoleCount } = render(
      <List
        items={[
          { children: 'First item', key: 'first' },
          { children: 'Second item', key: 'second' },
        ]}
        label="Items"
      />,
    );

    const list: HTMLElement = getByName('list', 'Items');
    expect(getRoleCount('listitem')).toBe(2);
    expect(list).toHaveTextContent('First item');
    expect(list).toHaveTextContent('Second item');
  });

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
