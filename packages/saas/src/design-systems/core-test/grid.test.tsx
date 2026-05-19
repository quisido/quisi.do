import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';
import userEvent from '@testing-library/user-event';

const { Grid } = await importTestedDesignSystem();

const getCaption = (grid: HTMLElement): HTMLTableCaptionElement => {
  const caption: HTMLTableCaptionElement | null = grid
    .getElementsByTagName('caption')
    .item(0);

  if (caption === null) {
    throw new Error('Expected grid to have a caption.');
  }

  return caption;
};

describe('Grid', (): void => {
  it('should use the visible caption as the accessible name', (): void => {
    const { getByName } = render(<Grid caption="Test grid" rows={[]} />);

    const grid: HTMLElement = getByName('grid', 'Test grid');
    const caption: HTMLTableCaptionElement = getCaption(grid);

    expect(grid).toHaveAttribute('aria-labelledby', caption.id);
    expect(caption).toHaveTextContent('Test grid');
  });

  it('should render the caption as the first non-generic descendant', (): void => {
    const { getByName } = render(
      <Grid
        caption="Ordered caption"
        rows={[{ cells: [{ content: 'Ordered cell', key: 1 }], key: 1 }]}
      />,
    );

    const grid: HTMLElement = getByName('grid', 'Ordered caption');
    const caption: HTMLTableCaptionElement = getCaption(grid);

    expect(grid.firstElementChild).toBe(caption);
  });

  it('should contain rows in a row group and cells in rows', (): void => {
    const { getByName, getRoleCount } = render(
      <Grid
        caption="Structured grid"
        rows={[
          {
            cells: [
              { content: 'First cell', key: 1 },
              { content: 'Second cell', key: 2 },
            ],
            key: 1,
          },
          { cells: [{ content: 'Third cell', key: 3 }], key: 2 },
        ]}
      />,
    );

    expect(getRoleCount('rowgroup')).toBe(1);
    expect(getRoleCount('row')).toBe(2);
    expect(getRoleCount('gridcell')).toBe(3);

    for (const name of ['First cell', 'Second cell', 'Third cell']) {
      const gridCell: HTMLElement = getByName('gridcell', name);
      expect(gridCell.parentElement).toHaveAttribute('role', 'row');
      expect(gridCell.parentElement?.parentElement).toHaveAttribute(
        'role',
        'rowgroup',
      );
    }
  });

  it('should reuse native table elements for the grid structure', (): void => {
    const { getByName } = render(
      <Grid
        caption="Native grid"
        rows={[{ cells: [{ content: 'Native cell', key: 1 }], key: 1 }]}
      />,
    );

    const grid: HTMLElement = getByName('grid', 'Native grid');
    const gridCell: HTMLElement = getByName('gridcell', 'Native cell');

    expect(grid.tagName).toBe('TABLE');
    expect(gridCell.parentElement?.tagName).toBe('TR');
    expect(gridCell.tagName).toBe('TD');
    expect(gridCell).not.toHaveAttribute('aria-rowspan');
    expect(gridCell).not.toHaveAttribute('aria-colspan');
  });

  it('should provide two-dimensional keyboard navigation among text cells', async (): Promise<void> => {
    const { getByName, tab } = render(
      <Grid
        caption="Keyboard grid"
        rows={[
          {
            cells: [
              { content: 'Alpha', key: 'alpha' },
              { content: 'Bravo', key: 'bravo' },
            ],
            key: 1,
          },
          {
            cells: [
              { content: 'Charlie', key: 'charlie' },
              { content: 'Delta', key: 'delta' },
            ],
            key: 2,
          },
        ]}
      />,
    );

    const alpha: HTMLElement = getByName('gridcell', 'Alpha');
    const bravo: HTMLElement = getByName('gridcell', 'Bravo');
    const charlie: HTMLElement = getByName('gridcell', 'Charlie');
    const delta: HTMLElement = getByName('gridcell', 'Delta');

    expect(alpha.tabIndex).toBe(0);
    expect(bravo.tabIndex).toBe(-1);
    expect(charlie.tabIndex).toBe(-1);
    expect(delta.tabIndex).toBe(-1);

    await tab();
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

  it('should preserve focus when arrow navigation reaches a grid edge', async (): Promise<void> => {
    const { getByName, tab } = render(
      <Grid
        caption="Bounded grid"
        rows={[{ cells: [{ content: 'Only cell', key: 1 }], key: 1 }]}
      />,
    );

    const gridCell: HTMLElement = getByName('gridcell', 'Only cell');

    await tab();
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

  it('should not imply editability or selection when neither state is specified', (): void => {
    const { getByName } = render(
      <Grid
        caption="Static grid"
        rows={[{ cells: [{ content: 'Static cell', key: 1 }], key: 1 }]}
      />,
    );

    const grid: HTMLElement = getByName('grid', 'Static grid');
    const gridCell: HTMLElement = getByName('gridcell', 'Static cell');

    expect(grid).not.toHaveAttribute('aria-readonly');
    expect(grid).not.toHaveAttribute('aria-multiselectable');
    expect(gridCell).not.toHaveAttribute('aria-readonly');
    expect(gridCell).not.toHaveAttribute('aria-selected');
  });

  it('should propagate read only state to grid cells', (): void => {
    const { getByName } = render(
      <Grid
        caption="Read only grid"
        readOnly
        rows={[{ cells: [{ content: 'Read only cell', key: 1 }], key: 1 }]}
      />,
    );

    const grid: HTMLElement = getByName('grid', 'Read only grid');
    const gridCell: HTMLElement = getByName('gridcell', 'Read only cell');

    expect(grid).toHaveAttribute('aria-readonly', 'true');
    expect(gridCell).toHaveAttribute('aria-readonly', 'true');
  });

  it('should indicate a selected grid cell', (): void => {
    const { getByName } = render(
      <Grid
        caption="Single selection grid"
        rows={[
          {
            cells: [
              { content: 'Unselected cell', key: 'first' },
              { content: 'Selected cell', key: 'second' },
            ],
            key: 'row',
          },
        ]}
        selected={['row', 'second']}
      />,
    );

    const grid: HTMLElement = getByName('grid', 'Single selection grid');
    const selectedCell: HTMLElement = getByName('gridcell', 'Selected cell');
    const unselectedCell: HTMLElement = getByName(
      'gridcell',
      'Unselected cell',
    );

    expect(grid).not.toHaveAttribute('aria-multiselectable');
    expect(selectedCell).toHaveAttribute('aria-selected', 'true');
    expect(unselectedCell).toHaveAttribute('aria-selected', 'false');
  });

  it('should indicate multiple selected grid cells', (): void => {
    const { getByName } = render(
      <Grid
        caption="Multiple selection grid"
        rows={[
          {
            cells: [
              { content: 'First selected cell', key: 'first' },
              { content: 'Second selected cell', key: 'second' },
            ],
            key: 'row',
          },
        ]}
        selected={new Map([['row', new Set(['first', 'second'])]])}
      />,
    );

    const grid: HTMLElement = getByName('grid', 'Multiple selection grid');
    const firstCell: HTMLElement = getByName('gridcell', 'First selected cell');
    const secondCell: HTMLElement = getByName(
      'gridcell',
      'Second selected cell',
    );

    expect(grid).toHaveAttribute('aria-multiselectable', 'true');
    expect(firstCell).toHaveAttribute('aria-selected', 'true');
    expect(secondCell).toHaveAttribute('aria-selected', 'true');
  });
});
