import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MarkProps } from '../core/mark-props.js';

export default function testMark(Mark: ComponentType<MarkProps>): void {
  describe('Mark', (): void => {
    it('should mark text', (): void => {
      const { getByRole } = render(
        <>
          <span id="test-id">Test description</span>
          <Mark describedBy="test-id">Test mark</Mark>
        </>,
      );
      getByRole('mark', { description: 'Test description' });
    });
  });
}
