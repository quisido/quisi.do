import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ScrollbarProps } from '../core/scrollbar-props.js';

export default function testScrollbar(
  Scrollbar: ComponentType<ScrollbarProps>,
): void {
  describe('Scrollbar', (): void => {
    it('should be a scrollbar', (): void => {
      const { getByRole } = render(
        <>
          <div id="test-scrollbar-controls-id">Test content</div>
          <Scrollbar
            controls="test-scrollbar-controls-id"
            disabled
            max={3}
            min={1}
            orientation="horizontal"
            value={2}
          />
        </>,
      );

      const scrollbar: HTMLElement = getByRole('scrollbar');
      expect(scrollbar).toHaveAttribute(
        'aria-controls',
        'test-scrollbar-controls-id',
      );
      expect(scrollbar).toHaveAttribute('aria-disabled', 'true');
      expect(scrollbar).toHaveAttribute('aria-orientation', 'horizontal');
      expect(scrollbar).toHaveAttribute('aria-valuemax', '3');
      expect(scrollbar).toHaveAttribute('aria-valuemin', '1');
      expect(scrollbar).toHaveAttribute('aria-valuenow', '2');
    });

    it('should have defaults', (): void => {
      const { getByRole } = render(
        <>
          <div id="test-scrollbar-defaults-id">Test content</div>
          <Scrollbar controls="test-scrollbar-defaults-id" value={1} />
        </>,
      );

      const scrollbar: HTMLElement = getByRole('scrollbar');
      expect(scrollbar).toHaveAttribute('aria-disabled', 'false');
      expect(scrollbar).toHaveAttribute('aria-orientation', 'vertical');
      expect(scrollbar).toHaveAttribute('aria-valuemax', '100');
      expect(scrollbar).toHaveAttribute('aria-valuemin', '0');
    });
  });
}
