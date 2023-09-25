import { renderHook } from '@testing-library/react';
import useAwsuiTableItemDescription from '../index.js';
import mapElementToProps from '../test/utils/map-element-to-props.js';
import mapElementToRenderHookOptions from '../test/utils/map-element-to-render-hook-options.js';

describe('useAwsuiTableItemDescription', (): void => {
  it('should not throw when there is no component', (): void => {
    renderHook(useAwsuiTableItemDescription, {
      initialProps: {
        ...mapElementToProps(null),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Component: undefined,
      },
    });
  });

  it('should not throw when the table has not mounted yet', (): void => {
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(null),
    );
  });

  it('should not throw when the ref does not contain a table', (): void => {
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(document.createElement('div')),
    );
  });

  it('should not throw when the ref does not contain a tbody', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    div.appendChild(document.createElement('table'));
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
  });

  it('should not throw when the ref does not contain a tr', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    const table: HTMLTableElement = document.createElement('table');
    table.appendChild(document.createElement('tbody'));
    div.appendChild(table);
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
  });

  it('should not throw when the ref does not contain a td', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    const table: HTMLTableElement = document.createElement('table');
    const tbody: HTMLTableSectionElement = document.createElement('tbody');
    tbody.appendChild(document.createElement('tr'));
    table.appendChild(tbody);
    div.appendChild(table);
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
  });

  it('should not throw when the ref does not contain a border-bottom-width', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    const table: HTMLTableElement = document.createElement('table');
    const tbody: HTMLTableSectionElement = document.createElement('tbody');
    const tr: HTMLTableRowElement = document.createElement('tr');
    tr.appendChild(document.createElement('td'));
    table.appendChild(tr);
    table.appendChild(tbody);
    div.appendChild(table);
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
  });

  it('should not throw when the ref does not contain a cell class name', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    const table: HTMLTableElement = document.createElement('table');
    const tbody: HTMLTableSectionElement = document.createElement('tbody');
    const tr: HTMLTableRowElement = document.createElement('tr');
    const cell: HTMLTableCellElement = document.createElement('td');
    cell.style.setProperty('border-bottom-width', '1px');
    tr.appendChild(cell);
    table.appendChild(tr);
    table.appendChild(tbody);
    div.appendChild(table);
    renderHook(
      useAwsuiTableItemDescription,
      mapElementToRenderHookOptions(div),
    );
  });

  // This should trigger `if (!isMounted.current)`, but does not. This implies
  //   that ReactDOM's render callback is actually synchronous, meaning there is
  //   no way to test it. The code will remain in case ReactDOM ever pushes an
  //   asynchronous change, so as to be non-breaking.
  it('should not throw when unmounting before rendering', (): void => {
    const div: HTMLDivElement = document.createElement('div');
    const table: HTMLTableElement = document.createElement('table');
    const tbody: HTMLTableSectionElement = document.createElement('tbody');
    const tr: HTMLTableRowElement = document.createElement('tr');
    const cell: HTMLTableCellElement = document.createElement('td');
    cell.className = 'test-cell-class-name';
    cell.style.setProperty('border-bottom-width', '1px');
    tr.appendChild(cell);
    table.appendChild(tr);
    table.appendChild(tbody);
    div.appendChild(table);
    const { unmount } = renderHook(useAwsuiTableItemDescription, {
      initialProps: {
        ...mapElementToProps(div),
        items: [
          { description: 'description', value: 'value' },
          { description: 'description', value: 'value' },
          { description: 'description', value: 'value' },
        ],
      },
    });
    unmount();
  });
});
