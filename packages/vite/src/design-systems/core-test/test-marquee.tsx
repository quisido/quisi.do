import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MarqueeProps } from '../core/marquee-props.js';

export default function testMarquee(
  Marquee: ComponentType<MarqueeProps>,
): void {
  describe('Marquee', (): void => {
    it('should be a marquee', (): void => {
      const { getByRole } = render(
        <Marquee label="Test marquee">Test content</Marquee>,
      );

      getByRole('marquee', { name: 'Test marquee' });
    });
  });
}
