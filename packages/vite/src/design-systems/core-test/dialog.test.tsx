import { describe, expect, it, vi } from 'vitest';
import render, { type RenderTest } from './render.js';
import type { DialogProps } from '../core/dialog-props.js';
import noop from '../../utils/noop.js';
import importTestedDesignSystem from './import-tested-design-system.js';

const { Dialog } = await importTestedDesignSystem();

const renderDialog = (props: Partial<DialogProps> = {}): RenderTest =>
  render(
    <Dialog description="Test description" heading="Test heading" {...props}>
      {props.children ?? 'Test content'}
    </Dialog>,
  );

describe('Dialog', (): void => {
  it('should support a heading', (): void => {
    const { getByName } = renderDialog();

    getByName('dialog', 'Test heading');
  });

  it('should support an external label', (): void => {
    const { getByName } = render(
      <>
        <span id="test-dialog-label-id">Test labelled by</span>
        <Dialog
          description="Test description"
          labelledBy="test-dialog-label-id"
        >
          Test content
        </Dialog>
      </>,
    );

    getByName('dialog', 'Test labelled by');
  });

  it('should be described by visible content', (): void => {
    const { getByDescription, getByName } = renderDialog({
      description: 'Visible instructions',
      heading: 'Described dialog',
    });

    const dialog: HTMLElement = getByDescription(
      'dialog',
      'Visible instructions',
    );
    expect(dialog).toBe(getByName('dialog', 'Described dialog'));
    expect(dialog).toHaveAttribute('aria-describedby');
    expect(dialog).not.toHaveAttribute('aria-description');
  });

  it('should contain dialog content', (): void => {
    const { getByName } = renderDialog({
      children: 'Content related to the primary window',
      heading: 'Related content',
    });

    const dialog: HTMLElement = getByName('dialog', 'Related content');
    expect(dialog).toHaveTextContent('Content related to the primary window');
  });

  it('should include a focusable descendant', (): void => {
    const { getByName } = renderDialog();

    const dialog: HTMLElement = getByName('dialog', 'Test heading');
    const closeButton: HTMLElement = getByName('button', 'Close');
    expect(dialog).toContainElement(closeButton);
  });

  it('should be modeless by default', (): void => {
    const { getByName } = renderDialog({
      heading: 'Modeless',
    });

    const dialog: HTMLElement = getByName('dialog', 'Modeless');
    expect(dialog).toHaveAttribute('aria-modal', 'false');
  });

  it('should allow keyboard navigation to leave a modeless dialog', async (): Promise<void> => {
    const { getByName, tab } = render(
      <>
        <button type="button">Before button</button>
        <Dialog description="Modeless description" heading="Modeless">
          <button type="button">Child button</button>
        </Dialog>
        <button type="button">After button</button>
      </>,
    );

    const childButton: HTMLElement = getByName('button', 'Child button');
    const closeButton: HTMLElement = getByName('button', 'Close');
    const afterButton: HTMLElement = getByName('button', 'After button');

    await tab();
    expect(childButton).toHaveFocus();
    await tab();
    expect(closeButton).toHaveFocus();
    await tab();
    expect(afterButton).toHaveFocus();
  });

  it('should be modal when requested', (): void => {
    const { getByName } = renderDialog({
      heading: 'Modal',
      modal: true,
      onDismiss: noop,
    });

    const dialog: HTMLElement = getByName('dialog', 'Modal');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('should focus a descendant when displayed as modal', (): void => {
    const { getByName } = renderDialog({
      children: <button type="button">Child button</button>,
      heading: 'Modal',
      modal: true,
      onDismiss: noop,
    });

    const childButton: HTMLElement = getByName('button', 'Child button');
    expect(childButton).toHaveFocus();
  });

  it('should constrain keyboard focus while modal', async (): Promise<void> => {
    const { getByName, shiftTab, tab } = render(
      <>
        <button type="button">Before button</button>
        <Dialog
          description="Modal description"
          heading="Modal"
          modal
          onDismiss={noop}
        >
          <button type="button">Child button</button>
        </Dialog>
        <button type="button">After button</button>
      </>,
    );

    const dialog: HTMLElement = getByName('dialog', 'Modal');
    const closeButton: HTMLElement = getByName('button', 'Close');

    const expectFocusInDialog = (): void => {
      const focusedElement: Element | null = document.activeElement;
      expect(focusedElement).toBeInstanceOf(HTMLElement);
      expect(dialog).toContainElement(focusedElement as HTMLElement);
    };

    const childButton: HTMLElement = getByName('button', 'Child button');
    expect(childButton).toHaveFocus();
    await tab();
    expect(closeButton).toHaveFocus();
    await tab();
    expectFocusInDialog();
    await shiftTab();
    expectFocusInDialog();
    await shiftTab();
    expectFocusInDialog();
  });

  it('should be dismissible', async (): Promise<void> => {
    const handleDismiss = vi.fn();
    const { clickButton } = renderDialog({ onDismiss: handleDismiss });

    await clickButton('Close');
    expect(handleDismiss).toHaveBeenCalledExactlyOnceWith();
  });
});
