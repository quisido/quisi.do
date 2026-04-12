import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { TableProps } from '../core/table-props.js';

export default function testTable(Table: ComponentType<TableProps>): void {
  describe('Table', (): void => {
    it('should be a table', (): void => {
      const { getByName } = render(<Table caption="Test table" rows={[]} />);

      getByName('table', 'Test table');
    });

    // TODO: If a caption exists, it must be the first non-generic descendant.
  });
}
