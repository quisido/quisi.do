import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { ScrollbarProps } from '../core/scrollbar-props.js';

export default function testScrollbar(
  Scrollbar: ComponentType<ScrollbarProps>,
): void {
  describe('Scrollbar', (): void => {
    it('should be a scrollbar', (): void => {
      const { getByRole } = render(
        <>
          <div id="test-region">Test content</div>
          <Scrollbar controls="test-region" label="Test scrollbar" />
        </>,
      );

      getByRole('scrollbar', { name: 'Test scrollbar' });
    });
  });
}
