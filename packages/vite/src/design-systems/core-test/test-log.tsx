import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { LogProps } from '../core/log-props.js';

export default function testLog(Log: ComponentType<LogProps>): void {
  describe('Log', (): void => {
    it('should be a log', (): void => {
      const { getByRole } = render(<Log>Test content</Log>);

      const log: HTMLElement = getByRole('log');
      expect(log).toHaveTextContent('Test content');
    });
  });
}
