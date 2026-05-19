import { describe, expect, it } from 'vitest';
import render from './render.js';
import { within } from '@testing-library/react';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Alert } = await importTestedDesignSystem();

describe('Alert', (): void => {
  it('should be described', (): void => {
    const { getByDescription } = render(
      <Alert heading="Described alert" type="info">
        Description
      </Alert>,
    );
    getByDescription('alert', 'Description');
  });

  it('should be labelled by its heading', (): void => {
    const { getByName } = render(
      <Alert heading="Alert with heading" type="info">
        Content
      </Alert>,
    );

    getByName('alert', 'Alert with heading');
  });

  it('should contain the alert message', (): void => {
    const { getByName } = render(
      <Alert heading="Container" type="info">
        Alert message
      </Alert>,
    );
    within(getByName('alert', 'Container')).getByText('Alert message');
  });

  it('should not move focus', (): void => {
    const { focus, getByName, rerender } = render(
      <>
        <button type="button">Focused</button>
        {null}
      </>,
    );

    const focused: HTMLElement = getByName('button', 'Focused');
    focus(focused);
    expect(focused).toHaveFocus();

    rerender(
      <>
        <button type="button">Focused</button>
        <Alert heading="Focus" type="info">
          <button type="button">Unfocused</button>
        </Alert>
      </>,
    );

    const unfocused: HTMLElement = getByName('button', 'Unfocused');
    expect(focused).toHaveFocus();
    expect(unfocused).not.toHaveFocus();
  });

  describe('atomic', (): void => {
    it('should default to true', (): void => {
      const { getByName } = render(
        <Alert heading="Atomic" type="info">
          Content
        </Alert>,
      );

      const alertDialog: HTMLElement = getByName('alert', 'Atomic');
      expect(alertDialog).toHaveAttribute('aria-atomic', 'true');
    });

    it('should support false', (): void => {
      const { getByName } = render(
        <Alert atomic={false} heading="Non-atomic" type="info">
          Content
        </Alert>,
      );

      const alertDialog: HTMLElement = getByName('alert', 'Non-atomic');
      expect(alertDialog).toHaveAttribute('aria-atomic', 'false');
    });
  });

  describe('live', (): void => {
    it('should default to assertive', (): void => {
      const { getByName } = render(
        <Alert heading="Assertive" type="info">
          Content
        </Alert>,
      );

      const alertDialog: HTMLElement = getByName('alert', 'Assertive');
      expect(alertDialog).toHaveAttribute('aria-live', 'assertive');
    });

    it('should support off', (): void => {
      const { getByName } = render(
        <Alert heading="Off" live="off" type="info">
          Content
        </Alert>,
      );

      const alertDialog: HTMLElement = getByName('alert', 'Off');
      expect(alertDialog).toHaveAttribute('aria-live', 'off');
    });

    it('should support polite', (): void => {
      const { getByName } = render(
        <Alert heading="Polite" live="polite" type="info">
          Content
        </Alert>,
      );

      const alertDialog: HTMLElement = getByName('alert', 'Polite');
      expect(alertDialog).toHaveAttribute('aria-live', 'polite');
    });
  });
});
