import render from './render.js';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import type { StatusProps } from '../core/status-props.js';
import userEvent from '@testing-library/user-event';

export default function testStatus(Status: ComponentType<StatusProps>): void {
  describe('Status', (): void => {
    /** @see {@link https://w3c.github.io/aria/#status | Source} */
    it('should not receive focus when status changes', async (): Promise<void> => {
      const { getByRole, rerender } = render(
        <>
          <Status>First</Status>
          <button>Focused</button>
        </>,
      );

      // Focus the button.
      await userEvent.tab();

      // Change the status.
      rerender(
        <>
          <Status>Second</Status>
          <button>Focused</button>
        </>,
      );

      const status: HTMLElement = getByRole('status');
      expect(window.document.activeElement).not.toBe(status);
      expect(status).not.toHaveFocus();
    });
  });
}
