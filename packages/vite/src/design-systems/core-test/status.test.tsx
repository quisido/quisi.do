import { describe, expect, it } from 'vitest';
import render from './render.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Status } = await importTestedDesignSystem();

describe('Status', (): void => {
  it('should expose a status live region', (): void => {
    const { getByRole, getRoleCount } = render(<Status>Saving…</Status>);

    const status: HTMLElement = getByRole('status');
    expect(status).toHaveTextContent('Saving…');
    expect(getRoleCount('status')).toBe(1);
  });

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
    expect(button).toHaveFocus();
  });

  /**
   * When another part of the page controls what appears in the status, the
   * relationship should be made explicit with aria-controls.
   * @see {@link https://w3c.github.io/aria/#status | Source}
   */
  it('should support being referenced via aria-controls by a controlling element', (): void => {
    const { getByName, getByRole } = render(
      <>
        <button aria-controls="page-status" type="button">
          Save
        </button>
        <Status id="page-status">All changes saved.</Status>
      </>,
    );

    const button: HTMLElement = getByName('button', 'Save');
    const status: HTMLElement = getByRole('status');

    expect(button).toHaveAttribute('aria-controls', 'page-status');
    expect(status).toHaveAttribute('id', 'page-status');
  });

  it('should support an id for external references', (): void => {
    const { getByRole } = render(
      <Status id="upload-status">Upload complete.</Status>,
    );

    expect(getByRole('status')).toHaveAttribute('id', 'upload-status');
  });

  describe('atomic', (): void => {
    /**
     * Elements with the role status have an implicit aria-atomic value of true.
     * @see {@link https://w3c.github.io/aria/#status | Source}
     */
    it('should default to true', (): void => {
      const { getByRole } = render(<Status>Processing…</Status>);

      expect(getByRole('status')).toHaveAttribute('aria-atomic', 'true');
    });

    it('should support false', (): void => {
      const { getByRole } = render(
        <Status atomic={false}>3 of 10 items uploaded.</Status>,
      );

      expect(getByRole('status')).toHaveAttribute('aria-atomic', 'false');
    });
  });

  describe('live', (): void => {
    /**
     * Elements with the role status have an implicit aria-live value of polite.
     * @see {@link https://w3c.github.io/aria/#status | Source}
     */
    it('should default to polite', (): void => {
      const { getByRole } = render(<Status>Draft saved.</Status>);

      expect(getByRole('status')).toHaveAttribute('aria-live', 'polite');
    });

    it('should support off', (): void => {
      const { getByRole } = render(<Status live="off">Hidden status.</Status>);

      expect(getByRole('status')).toHaveAttribute('aria-live', 'off');
    });

    it('should support assertive', (): void => {
      const { getByRole } = render(
        <Status live="assertive">Session about to expire.</Status>,
      );

      expect(getByRole('status')).toHaveAttribute('aria-live', 'assertive');
    });
  });
});
