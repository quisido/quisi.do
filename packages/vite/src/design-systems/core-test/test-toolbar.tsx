import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { ToolbarProps } from '../core/toolbar-props.js';

export default function testToolbar(
  Toolbar: ComponentType<ToolbarProps>,
): void {
  describe('Toolbar', (): void => {
    describe('orientation', (): void => {
      it('should default to horizontal', (): void => {
        const { getByName } = render(
          <Toolbar label="Test default orientation">Test children</Toolbar>,
        );

        const toolbar: HTMLElement = getByName(
          'toolbar',
          'Test default orientation',
        );
        expect(toolbar).toHaveAttribute('aria-orientation', 'horizontal');
      });

      it('should support vertical', (): void => {
        const { getByName } = render(
          <Toolbar label="Test vertical orientation" orientation="vertical">
            Test children
          </Toolbar>,
        );

        const toolbar: HTMLElement = getByName(
          'toolbar',
          'Test vertical orientation',
        );
        expect(toolbar).toHaveAttribute('aria-orientation', 'vertical');
      });
    });
  });
}
