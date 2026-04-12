import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { GroupProps } from '../core/group-props.js';

export default function testGroup(Group: ComponentType<GroupProps>): void {
  describe('Group', (): void => {
    it('should be a group', (): void => {
      const { getByName } = render(
        <Group label="Test group">Test content</Group>,
      );

      getByName('group', 'Test group');
    });

    // TODO: If a caption exists, it must be the first non-generic descendant.
  });
}
