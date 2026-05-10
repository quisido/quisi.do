import { describe, expect, it, vi } from 'vitest';
import type { AlertDialogProps } from '../core/alert-dialog-props.js';
import render, { type RenderTest } from './render.js';
import noop from '../../utils/noop.js';
import { within } from '@testing-library/react';
import importTestedDesignSystem from './import-tested-design-system.js';

const { AlertDialog } = await importTestedDesignSystem();

const renderAlertDialog = (props: Partial<AlertDialogProps>): RenderTest =>
  render(
    <AlertDialog heading="Heading" onDismiss={noop} {...props}>
      {props.children ?? 'Content'}
    </AlertDialog>,
  );

describe('AlertDialog', (): void => {
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

  it('should be labelled by its heading', (): void => {
    const { getByName } = renderAlertDialog({ heading: 'Heading label' });
    getByName('alertdialog', 'Heading label');
  });

  it('should be modal', (): void => {
    const { getByName } = renderAlertDialog({ heading: 'Modal' });
    const modal: HTMLElement = getByName('alertdialog', 'Modal');
    expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  // Technical debt: I think userEvents does not respect z-index.
  it.skip('should block pointer events', async (): Promise<void> => {
    const handleClick = vi.fn();
    const { clickButton } = render(
      <>
        <button onClick={handleClick} type="button">
          Background button
        </button>
        <AlertDialog heading="Modal" onDismiss={noop}>
          Content
        </AlertDialog>
      </>,
    );

    await clickButton('Background button');
    expect(handleClick).not.toHaveBeenCalled();
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
    within(getByName('alertdialog', 'Container')).getByText('Alert message');
  });
});
