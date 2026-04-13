import { type SeparatorWidgetProps } from '../core/separator-widget-props.js';
import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';

export default function testSeparatorWidget(
  SeparatorWidget: ComponentType<SeparatorWidgetProps>,
): void {
  describe('SeparatorWidget', (): void => {
    it('should be a separator', (): void => {
      const { getByRole } = render(
        <SeparatorWidget max={3} min={1} value={2} />,
      );
      const separator: HTMLElement = getByRole('separator');
      expect(separator).toHaveAttribute('aria-valuemax', '3');
      expect(separator).toHaveAttribute('aria-valuemin', '1');
      expect(separator).toHaveAttribute('aria-valuenow', '2');
    });

    it('should have defaults', (): void => {
      const { getByRole } = render(<SeparatorWidget value={50} />);
      getByRole('separator');
    });
  });
}
