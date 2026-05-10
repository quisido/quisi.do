import render from './render.js';
import { describe, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Table } = await importTestedDesignSystem();

describe('Table', (): void => {
  it('should be a table', (): void => {
    const { getByName } = render(<Table caption="Test table" rows={[]} />);

    getByName('table', 'Test table');
  });

  // TODO: If a caption exists, it must be the first non-generic descendant.
});
