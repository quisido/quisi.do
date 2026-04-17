import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { MarqueeProps } from '../core/marquee-props.js';

export default function testMarquee(
  Marquee: ComponentType<MarqueeProps>,
): void {
  describe('Marquee', (): void => {
    it('should be a marquee', (): void => {
      const { getByRole } = render(<Marquee>Test content</Marquee>);

      const marquee: HTMLElement = getByRole('marquee');
      expect(marquee).toHaveTextContent('Test content');
    });
  });
}
