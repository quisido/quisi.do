import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { LogProps } from '../core/log-props.js';

export default function testLog(Log: ComponentType<LogProps>): void {
  describe('Log', (): void => {
    it('should be a log', (): void => {
      const { getByRole } = render(<Log label="Test log">Test content</Log>);

      getByRole('log', { name: 'Test log' });
    });
  });
}
