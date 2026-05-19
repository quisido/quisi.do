import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { List } = await importTestedDesignSystem();

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
