import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MainProps } from '../core/main-props.js';

export default function testMain(Main: ComponentType<MainProps>): void {
  describe('Main', (): void => {
    it('should be main content', (): void => {
      const { getByRole } = render(<Main label="Test main">Test content</Main>);

      getByRole('main', { name: 'Test main' });
    });
  });
}
