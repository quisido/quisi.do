import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { GroupProps } from '../core/group-props.js';

export default function testGroup(Group: ComponentType<GroupProps>): void {
  describe('Group', (): void => {
    it('should be a group', (): void => {
      const { getByRole } = render(
        <Group label="Test group">Test content</Group>,
      );

      getByRole('group', { name: 'Test group' });
    });

    // TODO: If a caption exists, it must be the first non-generic descendant.
  });
}
