import render from './render.js';
import type { ComponentType } from 'react';
import { describe, it } from 'vitest';
import type { MainProps } from '../core/main-props.js';

export default function testMain(Main: ComponentType<MainProps>): void {
  describe('Main', (): void => {
    it('should be main content', (): void => {
      const { getByName } = render(<Main label="Test main">Test content</Main>);
      getByName('main', 'Test main');
    });
  });
}
