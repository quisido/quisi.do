import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Tree, TreeItem } from './index.js';

describe('TreeItem', (): void => {
  it('should be a tree item', (): void => {
    const { getByRole } = render(
      <Tree label="Test tree">
        <TreeItem>Test tree item</TreeItem>
      </Tree>,
    );

    getByRole('treeitem', { name: 'Test tree item' });
  });
});
