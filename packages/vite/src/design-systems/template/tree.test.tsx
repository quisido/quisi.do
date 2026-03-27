import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Tree, TreeItem } from './index.js';

describe('Tree', (): void => {
  it('should be a tree', (): void => {
    const { getByRole } = render(
      <Tree label="Test tree">
        <TreeItem>Test tree item</TreeItem>
      </Tree>,
    );

    getByRole('tree', { name: 'Test tree' });
  });
});
