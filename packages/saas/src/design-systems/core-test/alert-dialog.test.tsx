import { assert, describe, expect, it, vi } from 'vitest';
import type { AlertDialogProps } from '../core/alert-dialog-props.js';
import render, { type RenderTest } from './render.js';
import noop from '../../utils/noop.js';
import importTestedDesignSystem from './import-tested-design-system.js';
import itShouldBeModal from './modal-test-suite.jsx';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

const { AlertDialog } = await importTestedDesignSystem();

const renderAlertDialog = (props: Partial<AlertDialogProps>): RenderTest =>
  render(
    <AlertDialog
      children="Content"
      heading="Heading"
      onDismiss={noop}
      {...props}
    />,
  );

describe('AlertDialog', (): void => {
  it('should focus an element within itself', (): void => {
    const { getByName } = renderAlertDialog({
      children: 'Focus is set to an element within the alert dialog.',
      heading: 'Focus',
    });

    const { activeElement } = window.document;
    const alertDialog: HTMLElement = getByName('alertdialog', 'Focus');
    assert(activeElement instanceof HTMLElement);
    expect(alertDialog).toContainElement(activeElement);
  });

  it('should be described', (): void => {
    const { getByDescription } = renderAlertDialog({
      children: 'Description',
    });
    getByDescription('alertdialog', 'Description');
  });

  it('should be dismissible', async (): Promise<void> => {
    const handleDismiss = vi.fn();
    const { clickButton } = renderAlertDialog({ onDismiss: handleDismiss });
    await clickButton('Dismiss');
    expect(handleDismiss).toHaveBeenCalledExactlyOnceWith();
  });

  it('should dismiss with Escape', async (): Promise<void> => {
    const handleDismiss = vi.fn();
    renderAlertDialog({ onDismiss: handleDismiss });

    await userEvent.keyboard('{Escape}');
    expect(handleDismiss).toHaveBeenCalledExactlyOnceWith();
  });

  it('should be labelled by its heading', (): void => {
    const { getByName } = renderAlertDialog({ heading: 'Heading label' });
    getByName('alertdialog', 'Heading label');
  });

  it('should be modal', (): void => {
    const { getByName } = renderAlertDialog({ heading: 'Modal' });
    const modal: HTMLElement = getByName('alertdialog', 'Modal');
    expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  // This test is the behavioral implications of being modal.
  it('should capture keyboard navigation', async (): Promise<void> => {
    const { getByName, shiftTab, tab } = render(
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

    expect(childButton).toHaveFocus();
    await tab();
    expect(dismissButton).toHaveFocus();
    await tab();
    expect(childButton).toHaveFocus();
    await tab();
    expect(dismissButton).toHaveFocus();
    await tab();
    expect(childButton).toHaveFocus();
    await shiftTab();
    expect(dismissButton).toHaveFocus();
    await shiftTab();
    expect(childButton).toHaveFocus();
    await shiftTab();
    expect(dismissButton).toHaveFocus();
    await shiftTab();
    expect(childButton).toHaveFocus();
  });

  it('should contain the alert message', (): void => {
    const { getByName } = renderAlertDialog({
      children: 'Alert message',
      heading: 'Container',
    });

    const alertDialog: HTMLElement = getByName('alertdialog', 'Container');
    within(alertDialog).getByText('Alert message');
  });

  it('should not be hidden by an ancestor', (): void => {
    const { getByName } = renderAlertDialog({ heading: 'Visible modal' });
    const alertDialog: HTMLElement = getByName('alertdialog', 'Visible modal');

    expect(alertDialog.closest('[aria-hidden="true"]')).toBeNull();
  });

  itShouldBeModal(
    <AlertDialog heading="Modal" onDismiss={noop}>
      Content
    </AlertDialog>,
    {
      getElement: ({ getByName }: RenderTest): HTMLElement =>
        getByName('alertdialog', 'Modal'),
    },
  );
});
