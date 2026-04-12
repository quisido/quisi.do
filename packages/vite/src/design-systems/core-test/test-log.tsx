import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { LogProps } from '../core/log-props.js';

export default function testLog(Log: ComponentType<LogProps>): void {
  describe('Log', (): void => {
    it('should be a log', (): void => {
      const { getByName } = render(<Log label="Test log">Test content</Log>);
      getByName('log', 'Test log');
    });
  });
}
