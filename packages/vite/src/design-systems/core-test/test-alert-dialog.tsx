import { describe, expect, it, vi } from 'vitest';
import { userEvent, type UserEvent } from '@testing-library/user-event';
import type { ComponentType } from 'react';
import type { AlertDialogProps } from '../core/alert-dialog-props.js';
import render, { type RenderTest } from './render.js';
import noop from '../../utils/noop.js';

interface AlertDialogTest extends RenderTest {
  readonly clickDismiss: () => Promise<void>;
}

export default function testAlertDialog(
  AlertDialog: ComponentType<AlertDialogProps>,
): void {
  const renderAlertDialog = (
    props: Partial<AlertDialogProps>,
  ): AlertDialogTest => {
    const user: UserEvent = userEvent.setup();
    const result: RenderTest = render(
      <AlertDialog heading="Heading" onDismiss={noop} {...props}>
        Content
      </AlertDialog>,
    );

    return {
      ...result,
      async clickDismiss(): Promise<void> {
        const dismissButton: HTMLElement = result.getByName(
          'button',
          'Dismiss',
        );
        await user.click(dismissButton);
      },
    };
  };

  describe('AlertDialog', (): void => {
    it('should be labelled by its heading', (): void => {
      const { getByName } = renderAlertDialog({ heading: 'Heading label' });
      getByName('alertdialog', 'Heading label');
    });

    it('should support dismissing', async (): Promise<void> => {
      const handleDismiss = vi.fn();
      const { clickDismiss } = renderAlertDialog({ onDismiss: handleDismiss });
      await clickDismiss();
      expect(handleDismiss).toHaveBeenCalledExactlyOnceWith();
    });

    it('must be described', (): void => {
      const { getByDescription } = renderAlertDialog({
        children: 'Test content',
      });
      getByDescription('alertdialog', 'Test content');
    });

    it('should be modal (capture keyboard navigation)', async (): Promise<void> => {
      const user: UserEvent = userEvent.setup();
      const { getByName } = render(
        <>
          <button type="button">Before button</button>
          <AlertDialog heading="Modal" onDismiss={noop}>
            <button type="button">Child button</button>
          </AlertDialog>
          ,<button type="button">After button</button>
        </>,
      );

      const childButton: HTMLElement = getByName('button', 'Child button');
      const dismissButton: HTMLElement = getByName('button', 'Dismiss');

      expect(window.document.activeElement).toBe(childButton);
      await user.tab();
      expect(window.document.activeElement).toBe(dismissButton);
      await user.tab();
      expect(window.document.activeElement).toBe(childButton);
      await user.tab();
      expect(window.document.activeElement).toBe(dismissButton);
      await user.tab();
      expect(window.document.activeElement).toBe(childButton);
      await user.tab();
      expect(window.document.activeElement).toBe(dismissButton);
    });
  });
}
