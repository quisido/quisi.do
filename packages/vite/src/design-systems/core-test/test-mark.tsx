import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MarkProps } from '../core/mark-props.js';
import render from './render.js';

export default function testMark(Mark: ComponentType<MarkProps>): void {
  describe('Mark', (): void => {
    it('should mark text', (): void => {
      const { getByDescription } = render(
        <>
          <span id="test-mark-description-id">Test description</span>
          <Mark describedBy="test-mark-description-id">Test mark</Mark>
        </>,
      );
      getByDescription('mark', 'Test description');
    });
  });
}
