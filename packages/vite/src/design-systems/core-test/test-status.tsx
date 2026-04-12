import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { StatusProps } from '../core/status-props.js';

export default function testStatus(Status: ComponentType<StatusProps>): void {
  describe('Status', (): void => {
    it('should be status', (): void => {
      const { getByName } = render(
        <Status label="Test status">Test content</Status>,
      );

      getByName('status', 'Test status');
    });
  });
}
