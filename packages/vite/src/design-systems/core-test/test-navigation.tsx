import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { NavigationProps } from '../core/navigation-props.js';

export default function testNavigation(
  Navigation: ComponentType<NavigationProps>,
): void {
  describe('Navigation', (): void => {
    it('should be navigation', (): void => {
      const { getByRole } = render(
        <Navigation label="Test navigation">Test content</Navigation>,
      );

      getByRole('navigation', { name: 'Test navigation' });
    });
  });
}
