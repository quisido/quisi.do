import { userEvent } from 'vitest/browser';
import render from './render.js';
import { describe, expect, it, vi } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Tree } = await importTestedDesignSystem();

describe('Tree', (): void => {
  it('should expose a named vertical tree of tree items', (): void => {
    const { getByName, getRoleCount } = render(
      <Tree
        label="File browser"
        required
        items={[{ content: 'README', key: 'readme' }]}
      />,
    );

    const tree: HTMLElement = getByName('tree', 'File browser');
    const treeItem: HTMLElement = getByName('treeitem', 'README');
    expect(tree).toHaveAttribute('aria-orientation', 'vertical');
    expect(tree).toHaveAttribute('aria-required', 'true');
    expect(tree).toHaveAttribute('aria-multiselectable', 'false');
    expect(tree).toContainElement(treeItem);
    expect(getRoleCount('tree')).toBe(1);
    expect(getRoleCount('treeitem')).toBe(1);
  });

  it('should support visible labels and horizontal orientation', (): void => {
    const { getByName } = render(
      <>
        <span id="tree-label">Repository outline</span>
        <Tree
          labelledBy="tree-label"
          orientation="horizontal"
          items={[{ content: 'Packages', key: 'packages' }]}
        />
      </>,
    );

    expect(getByName('tree', 'Repository outline')).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    );
  });

  it('should make child groups accessibility children of expandable tree items', (): void => {
    const { getByName, getByRole, getRoleCount } = render(
      <Tree
        label="Project files"
        items={[
          {
            content: 'Source',
            expanded: true,
            items: [{ content: 'index.ts', key: 'index' }],
            key: 'source',
          },
        ]}
      />,
    );

    const tree: HTMLElement = getByName('tree', 'Project files');
    const parent: HTMLElement = getByName('treeitem', 'Source');
    const group: HTMLElement = getByRole('group');
    const child: HTMLElement = getByName('treeitem', 'index.ts');
    expect(tree).toContainElement(parent);
    expect(parent).toHaveAttribute('aria-expanded', 'true');
    expect(parent).toContainElement(group);
    expect(group).toContainElement(child);
    expect(getRoleCount('group')).toBe(1);
    expect(getRoleCount('treeitem')).toBe(2);
  });

  it('should omit collapsed child groups from the accessibility tree', (): void => {
    const { getByName, getRoleCount } = render(
      <Tree
        label="Collapsed files"
        items={[
          {
            content: 'Source',
            expanded: false,
            items: [{ content: 'index.ts', key: 'index' }],
            key: 'source',
          },
        ]}
      />,
    );

    expect(getByName('treeitem', 'Source')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(getRoleCount('group')).toBe(0);
    expect(getRoleCount('treeitem')).toBe(1);
  });

  it('should manage focus among visible tree items', async (): Promise<void> => {
    const { getByName } = render(
      <Tree
        label="Focusable tree"
        items={[
          { content: 'First', key: 'first' },
          {
            content: 'Second',
            expanded: true,
            items: [{ content: 'Second child', key: 'second-child' }],
            key: 'second',
          },
          { content: 'Third', key: 'third' },
        ]}
      />,
    );

    const first: HTMLElement = getByName('treeitem', 'First');
    const second: HTMLElement = getByName('treeitem', 'Second');
    const secondChild: HTMLElement = getByName('treeitem', 'Second child');
    const third: HTMLElement = getByName('treeitem', 'Third');
    expect(first).toHaveAttribute('tabindex', '0');
    expect(second).toHaveAttribute('tabindex', '-1');

    first.focus();
    expect(first).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(second).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(secondChild).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    expect(third).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    expect(secondChild).toHaveFocus();
    await userEvent.keyboard('{Home}');
    expect(first).toHaveFocus();
    await userEvent.keyboard('{End}');
    expect(third).toHaveFocus();
  });

  it('should move focus between parent and child tree items with horizontal arrows', async (): Promise<void> => {
    const handleToggle = vi.fn();
    const { getByName } = render(
      <Tree
        label="Expandable tree"
        onToggle={handleToggle}
        items={[
          {
            content: 'Parent',
            expanded: true,
            items: [{ content: 'Child', key: 'child' }],
            key: 'parent',
          },
        ]}
      />,
    );

    const parent: HTMLElement = getByName('treeitem', 'Parent');
    const child: HTMLElement = getByName('treeitem', 'Child');
    parent.focus();
    expect(parent).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(child).toHaveFocus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(parent).toHaveFocus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(handleToggle).toHaveBeenCalledExactlyOnceWith('parent');
  });

  it('should request expansion for collapsed expandable tree items', async (): Promise<void> => {
    const handleToggle = vi.fn();
    const { getByName } = render(
      <Tree
        label="Collapsed tree"
        onToggle={handleToggle}
        items={[
          {
            content: 'Parent',
            expanded: false,
            items: [{ content: 'Child', key: 'child' }],
            key: 'parent',
          },
        ]}
      />,
    );

    const parent: HTMLElement = getByName('treeitem', 'Parent');
    parent.focus();
    expect(parent).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(handleToggle).toHaveBeenCalledExactlyOnceWith('parent');
  });

  it('should invoke selection without adding checked state in a single-select tree', async (): Promise<void> => {
    const handleSelect = vi.fn();
    const { getByName } = render(
      <Tree
        label="Single select tree"
        onSelect={handleSelect}
        items={[
          { content: 'Selected', key: 'selected', selected: true },
          { content: 'Available', key: 'available', selected: false },
        ]}
      />,
    );

    const selected: HTMLElement = getByName('treeitem', 'Selected');
    const available: HTMLElement = getByName('treeitem', 'Available');
    expect(selected).toHaveAttribute('aria-selected', 'true');
    expect(selected).not.toHaveAttribute('aria-checked');
    expect(available).toHaveAttribute('aria-selected', 'false');

    selected.focus();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    expect(handleSelect).toHaveBeenCalledExactlyOnceWith('available');
  });

  it('should support checked state for multi-select trees without selected state', (): void => {
    const { getByName } = render(
      <Tree
        label="Multi select tree"
        multiselectable
        items={[
          { checked: true, content: 'Checked', key: 'checked' },
          { checked: false, content: 'Unchecked', key: 'unchecked' },
        ]}
      />,
    );

    const tree: HTMLElement = getByName('tree', 'Multi select tree');
    const checked: HTMLElement = getByName('treeitem', 'Checked');
    const unchecked: HTMLElement = getByName('treeitem', 'Unchecked');
    expect(tree).toHaveAttribute('aria-multiselectable', 'true');
    expect(checked).toHaveAttribute('aria-checked', 'true');
    expect(checked).not.toHaveAttribute('aria-selected');
    expect(unchecked).toHaveAttribute('aria-checked', 'false');
  });
});
