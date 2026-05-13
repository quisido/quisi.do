import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Table } = await importTestedDesignSystem();

const getCaption = (table: HTMLElement): HTMLTableCaptionElement => {
  const caption: HTMLTableCaptionElement | null = table
    .getElementsByTagName('caption')
    .item(0);

  if (caption === null) {
    throw new Error('Expected table to have a caption.');
  }

  return caption;
};

describe('Table', (): void => {
  it('should use the visible caption as the accessible name', (): void => {
    const { getByName } = render(<Table caption="Test table" rows={[]} />);

    const table: HTMLElement = getByName('table', 'Test table');
    const caption: HTMLTableCaptionElement = getCaption(table);

    expect(table).toHaveAttribute('aria-labelledby', caption.id);
    expect(caption).toHaveTextContent('Test table');
  });

  it('should render the caption as the first non-generic descendant', (): void => {
    const { getByName } = render(
      <Table
        caption="Ordered caption"
        rows={[{ cells: [{ content: 'Ordered cell', key: 1 }], key: 1 }]}
      />,
    );

    const table: HTMLElement = getByName('table', 'Ordered caption');
    const caption: HTMLTableCaptionElement = getCaption(table);

    expect(table.firstElementChild).toBe(caption);
  });

  it('should contain rows in a row group and cells in rows', (): void => {
    const { getByName, getRoleCount } = render(
      <Table
        caption="Structured table"
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
    expect(getRoleCount('cell')).toBe(3);

    for (const name of ['First cell', 'Second cell', 'Third cell']) {
      const cell: HTMLElement = getByName('cell', name);
      expect(cell.parentElement).toHaveAttribute('role', 'row');
      expect(cell.parentElement?.parentElement?.tagName).toBe('TBODY');
    }
  });

  it('should reuse native table elements for the table structure', (): void => {
    const { getByName } = render(
      <Table
        caption="Native table"
        rows={[{ cells: [{ content: 'Native cell', key: 1 }], key: 1 }]}
      />,
    );

    const table: HTMLElement = getByName('table', 'Native table');
    const caption: HTMLTableCaptionElement = getCaption(table);
    const cell: HTMLElement = getByName('cell', 'Native cell');

    expect(table.tagName).toBe('TABLE');
    expect(caption.tagName).toBe('CAPTION');
    expect(cell.parentElement?.tagName).toBe('TR');
    expect(cell.parentElement?.parentElement?.tagName).toBe('TBODY');
    expect(cell.tagName).toBe('TD');
  });

  it('should not expose grid behavior or selection state', (): void => {
    const { getByName, getOptionalByRole } = render(
      <Table
        caption="Static table"
        rows={[{ cells: [{ content: 'Static cell', key: 1 }], key: 1 }]}
      />,
    );

    const table: HTMLElement = getByName('table', 'Static table');
    const cell: HTMLElement = getByName('cell', 'Static cell');

    expect(getOptionalByRole('grid')).toBeNull();
    expect(getOptionalByRole('treegrid')).toBeNull();
    expect(table).not.toHaveAttribute('aria-multiselectable');
    expect(table).not.toHaveAttribute('aria-readonly');
    expect(table).not.toHaveAttribute('aria-activedescendant');
    expect(cell).not.toHaveAttribute('aria-selected');
    expect(cell).not.toHaveAttribute('aria-readonly');
    expect(cell).not.toHaveAttribute('tabindex');
  });
});
