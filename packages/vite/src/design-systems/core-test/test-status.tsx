import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { StatusProps } from '../core/status-props.js';

export default function testStatus(Status: ComponentType<StatusProps>): void {
  describe('Status', (): void => {
    /** @see {@link https://w3c.github.io/aria/#status | Source} */
    it('should not receive focus when status changes', (): void => {
      const { focus, getByName, getByRole, rerender } = render(
        <>
          <Status>Inactive</Status>
          <button type="button">Focused</button>
        </>,
      );

      const button: HTMLElement = getByName('button', 'Focused');
      focus(button);

      rerender(
        <>
          <Status>Active</Status>
          <button type="button">Focused</button>
        </>,
      );

      const status: HTMLElement = getByRole('status');
      expect(status).not.toHaveFocus();
    });
  });
}
