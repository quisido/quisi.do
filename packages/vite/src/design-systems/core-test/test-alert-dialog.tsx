import { describe, expect, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import type { ComponentType } from 'react';
import type { AlertDialogProps } from '../core/alert-dialog-props.js';
import render from './render.js';

const handleTestDismiss = vi.fn();

export default function testAlertDialog(
  AlertDialog: ComponentType<AlertDialogProps>,
): void {
  describe('AlertDialog', (): void => {
    it('should support headings', (): void => {
      const { getByName } = render(
        <AlertDialog heading="Test heading" onDismiss={handleTestDismiss}>
          Test content
        </AlertDialog>,
      );
      getByName('alertdialog', 'Test heading');
    });

    it('should support labels', (): void => {
      const { getByName } = render(
        <AlertDialog label="Test label" onDismiss={handleTestDismiss}>
          Test content
        </AlertDialog>,
      );
      getByName('alertdialog', 'Test label');
    });

    it('should support labelled by', (): void => {
      const { getByName } = render(
        <>
          <span id="test-alert-dialog-label-id">Test labelled by</span>
          <AlertDialog
            labelledBy="test-alert-dialog-label-id"
            onDismiss={handleTestDismiss}
          >
            Test content
          </AlertDialog>
          ,
        </>,
      );
      getByName('alertdialog', 'Test labelled by');
    });

    it('should support dismissing', async (): Promise<void> => {
      const { getByName } = render(
        <AlertDialog
          label="Test dismissable label"
          onDismiss={handleTestDismiss}
        >
          Test content
        </AlertDialog>,
      );

      const dismissButton: HTMLElement = getByName('button', 'Dismiss');
      await userEvent.click(dismissButton);
      expect(handleTestDismiss).toHaveBeenCalledExactlyOnceWith();
    });

    it('must be described', (): void => {
      const { getByDescription } = render(
        <AlertDialog label="Test described label" onDismiss={handleTestDismiss}>
          Test content
        </AlertDialog>,
      );

      getByDescription('alertdialog', 'Test content');
    });

    it('should be modal (capture keyboard navigation)', async (): Promise<void> => {
      const { getByName } = render(
        <>
          <button type="button">First button</button>
          <AlertDialog label="Test modal label" onDismiss={handleTestDismiss}>
            <button type="button">Second button</button>
          </AlertDialog>
          ,<button type="button">Third button</button>
        </>,
      );

      const dismissButton: HTMLElement = getByName('button', 'Dismiss');
      const secondButton: HTMLElement = getByName('button', 'Second button');
      for (let loop = 0; loop < 5; loop++) {
        expect(window.document.activeElement).toBe(secondButton);
        // eslint-disable-next-line no-await-in-loop
        await userEvent.tab();
        expect(window.document.activeElement).toBe(dismissButton);
        // eslint-disable-next-line no-await-in-loop
        await userEvent.tab();
      }
    });
  });
}
