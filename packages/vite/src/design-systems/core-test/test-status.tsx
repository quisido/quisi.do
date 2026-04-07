import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { StatusProps } from '../core/status-props.js';

export default function testStatus(Status: ComponentType<StatusProps>): void {
  describe('Status', (): void => {
    it('should be status', (): void => {
      const { getByRole } = render(
        <Status label="Test status">Test content</Status>,
      );

      getByRole('status', { name: 'Test status' });
    });
  });
}
