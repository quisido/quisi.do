import { describe, expect, it } from 'vitest';
import type { ComponentType } from 'react';
import type { AlertProps } from '../core/alert-props.js';
import render from './render.js';
import { within } from '@testing-library/react';

export default function testAlert(Alert: ComponentType<AlertProps>): void {
  describe('Alert', (): void => {
    it('should be described', (): void => {
      const { getByDescription } = render(
        <Alert heading="Described" type="info">
          Description
        </Alert>,
      );
      getByDescription('alertdialog', 'Description');
    });

    it('should be labelled by its heading', (): void => {
      const { getByName } = render(
        <Alert heading="Heading label" type="info">
          Content
        </Alert>,
      );
      getByName('alert', 'Test heading');
    });

    it('should contain the alert message', (): void => {
      const { getByName } = render(
        <Alert heading="Container" type="info">
          Alert message
        </Alert>,
      );
      within(getByName('alert', 'getByName')).getByText('Alert message');
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

        const alertDialog: HTMLElement = getByName('alertdialog', 'Atomic');
        expect(alertDialog).toHaveAttribute('aria-atomic', 'true');
      });

      it('should support false', (): void => {
        const { getByName } = render(
          <Alert atomic={false} heading="Non-atomic" type="info">
            Content
          </Alert>,
        );

        const alertDialog: HTMLElement = getByName('alertdialog', 'Non-atomic');
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

        const alertDialog: HTMLElement = getByName('alertdialog', 'Assertive');
        expect(alertDialog).toHaveAttribute('aria-live', 'assertive');
      });

      it('should support off', (): void => {
        const { getByName } = render(
          <Alert heading="Off" type="info">
            Content
          </Alert>,
        );

        const alertDialog: HTMLElement = getByName('alertdialog', 'Off');
        expect(alertDialog).toHaveAttribute('aria-live', 'off');
      });

      it('should support polite', (): void => {
        const { getByName } = render(
          <Alert heading="Polite" type="info">
            Content
          </Alert>,
        );

        const alertDialog: HTMLElement = getByName('alertdialog', 'Polite');
        expect(alertDialog).toHaveAttribute('aria-live', 'polite');
      });
    });
  });
}
