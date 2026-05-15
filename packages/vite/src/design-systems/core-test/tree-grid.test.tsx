import { userEvent } from 'vitest/browser';
import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { TreeGrid } = await importTestedDesignSystem();

describe('TreeGrid', (): void => {
  it('should expose a named treegrid of rows and grid cells', (): void => {
    const { getByName, getRoleCount } = render(
      <TreeGrid
        caption="Project outline"
        rows={[
          {
            cells: [
              { content: 'Package', key: 'package' },
              { content: 'Status', key: 'status' },
            ],
            key: 'row',
          },
        ]}
      />,
    );

    const treeGrid: HTMLElement = getByName('treegrid', 'Project outline');
    const packageCell: HTMLElement = getByName('gridcell', 'Package');
    const statusCell: HTMLElement = getByName('gridcell', 'Status');

    expect(treeGrid.tagName).toBe('TABLE');
    expect(treeGrid).toContainElement(packageCell);
    expect(treeGrid).toContainElement(statusCell);
    expect(getRoleCount('treegrid')).toBe(1);
    expect(getRoleCount('rowgroup')).toBe(1);
    expect(getRoleCount('row')).toBe(1);
    expect(getRoleCount('gridcell')).toBe(2);
  });

  it('should represent rows that can be expanded and collapsed like tree items', (): void => {
    const { getByName } = render(
      <TreeGrid
        caption="Expandable rows"
        rows={[
          {
            cells: [{ content: 'Expanded package', key: 'name' }],
            expanded: true,
            key: 'expanded',
          },
          {
            cells: [{ content: 'Collapsed package', key: 'name' }],
            expanded: false,
            key: 'collapsed',
          },
        ]}
      />,
    );

    const expandedCell: HTMLElement = getByName('gridcell', 'Expanded package');
    const collapsedCell: HTMLElement = getByName(
      'gridcell',
      'Collapsed package',
    );

    expect(expandedCell.parentElement).toHaveAttribute('aria-expanded', 'true');
    expect(collapsedCell.parentElement).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('should support expandable and collapsible grid cells', (): void => {
    const { getByName } = render(
      <TreeGrid
        caption="Expandable cells"
        rows={[
          {
            cells: [
              { content: 'Expanded cell', expanded: true, key: 'expanded' },
              { content: 'Collapsed cell', expanded: false, key: 'collapsed' },
            ],
            key: 'row',
          },
        ]}
      />,
    );

    expect(getByName('gridcell', 'Expanded cell')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(getByName('gridcell', 'Collapsed cell')).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('should default to read only and propagate that state to grid cells', (): void => {
    const { getByName } = render(
      <TreeGrid
        caption="Read only treegrid"
        rows={[
          {
            cells: [
              { content: 'Read only name', key: 'name' },
              { content: 'Read only status', key: 'status' },
            ],
            key: 'row',
          },
        ]}
      />,
    );

    const treeGrid: HTMLElement = getByName('treegrid', 'Read only treegrid');
    const name: HTMLElement = getByName('gridcell', 'Read only name');
    const status: HTMLElement = getByName('gridcell', 'Read only status');

    expect(treeGrid).toHaveAttribute('aria-readonly', 'true');
    expect(name).toHaveAttribute('aria-readonly', 'true');
    expect(status).toHaveAttribute('aria-readonly', 'true');
  });

  it('should propagate editable state to focusable grid cells', (): void => {
    const { getByName } = render(
      <TreeGrid
        caption="Editable treegrid"
        readOnly={false}
        rows={[
          {
            cells: [
              { content: 'Editable name', key: 'name' },
              { content: 'Editable status', key: 'status' },
            ],
            key: 'row',
          },
        ]}
      />,
    );

    const treeGrid: HTMLElement = getByName('treegrid', 'Editable treegrid');
    const name: HTMLElement = getByName('gridcell', 'Editable name');
    const status: HTMLElement = getByName('gridcell', 'Editable status');

    expect(treeGrid).toHaveAttribute('aria-readonly', 'false');
    expect(name).toHaveAttribute('aria-readonly', 'false');
    expect(status).toHaveAttribute('aria-readonly', 'false');
    expect(name).toHaveAttribute('tabindex', '0');
    expect(status).toHaveAttribute('tabindex', '-1');
  });

  it('should allow individual grid cells to override propagated read only state', (): void => {
    const { getByName } = render(
      <TreeGrid
        caption="Mixed editability"
        rows={[
          {
            cells: [
              { content: 'Read only cell', key: 'readonly' },
              { content: 'Editable cell', key: 'editable', readOnly: false },
            ],
            key: 'row',
          },
        ]}
      />,
    );

    expect(getByName('treegrid', 'Mixed editability')).toHaveAttribute(
      'aria-readonly',
      'true',
    );
    expect(getByName('gridcell', 'Read only cell')).toHaveAttribute(
      'aria-readonly',
      'true',
    );
    expect(getByName('gridcell', 'Editable cell')).toHaveAttribute(
      'aria-readonly',
      'false',
    );
  });

  it('should manage focus among editable grid cells', async (): Promise<void> => {
    const { getByName } = render(
      <TreeGrid
        caption="Editable keyboard treegrid"
        readOnly={false}
        rows={[
          {
            cells: [
              { content: 'Editable first', key: 'first' },
              { content: 'Editable second', key: 'second' },
            ],
            key: 'row',
          },
        ]}
      />,
    );

    const first: HTMLElement = getByName('gridcell', 'Editable first');
    const second: HTMLElement = getByName('gridcell', 'Editable second');

    expect(first).toHaveAttribute('aria-readonly', 'false');
    expect(second).toHaveAttribute('aria-readonly', 'false');

    first.focus();
    expect(first).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(second).toHaveFocus();
  });

  it('should manage focus across mixed read only grid cells', async (): Promise<void> => {
    const { getByName } = render(
      <TreeGrid
        caption="Mixed keyboard treegrid"
        rows={[
          {
            cells: [
              { content: 'Locked cell', key: 'locked' },
              {
                content: 'Editable override',
                key: 'editable',
                readOnly: false,
              },
            ],
            key: 'row',
          },
        ]}
      />,
    );

    const locked: HTMLElement = getByName('gridcell', 'Locked cell');
    const editable: HTMLElement = getByName('gridcell', 'Editable override');

    expect(locked).toHaveAttribute('aria-readonly', 'true');
    expect(editable).toHaveAttribute('aria-readonly', 'false');

    locked.focus();
    expect(locked).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(editable).toHaveFocus();
  });

  it('should manage focus among grid cells in a read only treegrid', async (): Promise<void> => {
    const { getByName } = render(
      <TreeGrid
        caption="Keyboard treegrid"
        rows={[
          {
            cells: [
              { content: 'Alpha', key: 'alpha' },
              { content: 'Bravo', key: 'bravo' },
            ],
            key: 'first',
          },
          {
            cells: [
              { content: 'Charlie', key: 'charlie' },
              { content: 'Delta', key: 'delta' },
            ],
            key: 'second',
          },
        ]}
      />,
    );

    const treeGrid: HTMLElement = getByName('treegrid', 'Keyboard treegrid');
    const alpha: HTMLElement = getByName('gridcell', 'Alpha');
    const bravo: HTMLElement = getByName('gridcell', 'Bravo');
    const charlie: HTMLElement = getByName('gridcell', 'Charlie');
    const delta: HTMLElement = getByName('gridcell', 'Delta');

    expect(treeGrid).toHaveAttribute('aria-readonly', 'true');
    expect(alpha.tabIndex).toBe(0);
    expect(bravo.tabIndex).toBe(-1);
    expect(charlie.tabIndex).toBe(-1);
    expect(delta.tabIndex).toBe(-1);

    alpha.focus();
    expect(alpha).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(bravo).toHaveFocus();
    expect(alpha.tabIndex).toBe(-1);
    expect(bravo.tabIndex).toBe(0);

    await userEvent.keyboard('{ArrowDown}');
    expect(delta).toHaveFocus();
    expect(bravo.tabIndex).toBe(-1);
    expect(delta.tabIndex).toBe(0);

    await userEvent.keyboard('{ArrowLeft}');
    expect(charlie).toHaveFocus();
    expect(delta.tabIndex).toBe(-1);
    expect(charlie.tabIndex).toBe(0);

    await userEvent.keyboard('{ArrowUp}');
    expect(alpha).toHaveFocus();
    expect(charlie.tabIndex).toBe(-1);
    expect(alpha.tabIndex).toBe(0);
  });

  it('should move focus with Home and End keys', async (): Promise<void> => {
    const { getByName } = render(
      <TreeGrid
        caption="Home End treegrid"
        rows={[
          {
            cells: [
              { content: 'Alpha', key: 'alpha' },
              { content: 'Bravo', key: 'bravo' },
              { content: 'Charlie', key: 'charlie' },
            ],
            key: 'first',
          },
          {
            cells: [
              { content: 'Delta', key: 'delta' },
              { content: 'Echo', key: 'echo' },
              { content: 'Foxtrot', key: 'foxtrot' },
            ],
            key: 'second',
          },
        ]}
      />,
    );

    const alpha: HTMLElement = getByName('gridcell', 'Alpha');
    const charlie: HTMLElement = getByName('gridcell', 'Charlie');
    const delta: HTMLElement = getByName('gridcell', 'Delta');
    const echo: HTMLElement = getByName('gridcell', 'Echo');
    const foxtrot: HTMLElement = getByName('gridcell', 'Foxtrot');

    echo.focus();
    expect(echo).toHaveFocus();

    await userEvent.keyboard('{Home}');
    expect(delta).toHaveFocus();

    await userEvent.keyboard('{End}');
    expect(foxtrot).toHaveFocus();

    await userEvent.keyboard('{Control>}{Home}{/Control}');
    expect(alpha).toHaveFocus();

    await userEvent.keyboard('{End}');
    expect(charlie).toHaveFocus();

    await userEvent.keyboard('{Control>}{End}{/Control}');
    expect(foxtrot).toHaveFocus();
  });

  it('should manage focus through hierarchical rows', async (): Promise<void> => {
    const { getByName } = render(
      <TreeGrid
        caption="Hierarchical treegrid"
        rows={[
          {
            cells: [{ content: 'Parent package', key: 'name' }],
            expanded: true,
            key: 'parent',
          },
          {
            cells: [{ content: 'Child package', key: 'name' }],
            key: 'child',
          },
          {
            cells: [{ content: 'Collapsed package', key: 'name' }],
            expanded: false,
            key: 'collapsed',
          },
        ]}
      />,
    );

    const parent: HTMLElement = getByName('gridcell', 'Parent package');
    const child: HTMLElement = getByName('gridcell', 'Child package');
    const collapsed: HTMLElement = getByName('gridcell', 'Collapsed package');

    expect(parent.parentElement).toHaveAttribute('aria-expanded', 'true');
    expect(collapsed.parentElement).toHaveAttribute('aria-expanded', 'false');

    parent.focus();
    expect(parent).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    expect(child).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    expect(collapsed).toHaveFocus();
  });

  it('should preserve focus when arrow navigation reaches a treegrid edge', async (): Promise<void> => {
    const { getByName } = render(
      <TreeGrid
        caption="Bounded treegrid"
        rows={[{ cells: [{ content: 'Only cell', key: 'only' }], key: 'row' }]}
      />,
    );

    const gridCell: HTMLElement = getByName('gridcell', 'Only cell');

    gridCell.focus();
    expect(gridCell).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}');
    expect(gridCell).toHaveFocus();

    await userEvent.keyboard('{ArrowUp}');
    expect(gridCell).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(gridCell).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    expect(gridCell).toHaveFocus();
  });
});
