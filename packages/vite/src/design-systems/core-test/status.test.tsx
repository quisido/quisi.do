import render from './render.js';
import { describe, expect, it } from 'vitest';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Status } = await importTestedDesignSystem();

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
