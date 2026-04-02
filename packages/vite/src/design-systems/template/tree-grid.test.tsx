import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { TreeGrid } from './index.js';

describe('TreeGrid', (): void => {
  it('should be a tree grid', (): void => {
    const { getByRole } = render(
      <TreeGrid caption="Test tree grid" rows={[]} />,
    );

    getByRole('treegrid', { name: 'Test tree grid' });
  });

  // TODO: If a caption exists, it must be the first non-generic descendant.
});
