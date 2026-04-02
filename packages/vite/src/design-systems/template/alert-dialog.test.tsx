import { render } from '@testing-library/react';
import { assert, describe, expect, it, vi } from 'vitest';
import { AlertDialog } from './index.js';
import { userEvent, type UserEvent } from '@testing-library/user-event';

const handleTestDismiss = vi.fn();
const USER: UserEvent = userEvent.setup();

describe('AlertDialog', (): void => {
  it('should support headings', (): void => {
    const { getByRole } = render(
      <AlertDialog heading="Test heading" onDismiss={handleTestDismiss}>
        Test content
      </AlertDialog>,
    );
    getByRole('alertdialog', { name: 'Test heading' });
  });

  it('should support labels', (): void => {
    const { getByRole } = render(
      <AlertDialog label="Test label" onDismiss={handleTestDismiss}>
        Test content
      </AlertDialog>,
    );
    getByRole('alertdialog', { name: 'Test label' });
  });

  it('should support labelled by', (): void => {
    const { getByRole } = render(
      <>
        <span id="test-id">Test labelled by</span>
        <AlertDialog labelledBy="test-id" onDismiss={handleTestDismiss}>
          Test content
        </AlertDialog>
        ,
      </>,
    );
    getByRole('alertdialog', { name: 'Test labelled by' });
  });

  it('should support dismissing', async (): Promise<void> => {
    const { getAllByRole, getByRole } = render(
      <AlertDialog label="Test dismissable label" onDismiss={handleTestDismiss}>
        Test content
      </AlertDialog>,
    );

    const alertDialog: HTMLElement = getByRole('alertdialog', {
      name: 'Test dismissable label',
    });

    const isDescendant = (element: HTMLElement): boolean =>
      alertDialog.contains(element);

    const dismissButtons: readonly HTMLElement[] = getAllByRole('button', {
      name: 'Dismiss',
    });

    const dismissButton: HTMLElement | undefined =
      dismissButtons.find(isDescendant);

    assert(dismissButton !== undefined, 'Expected to find a dismiss button.');
    await USER.click(dismissButton);
    expect(handleTestDismiss).toHaveBeenCalledExactlyOnceWith();
  });

  it('must be described', (): void => {
    const { getByRole } = render(
      <AlertDialog label="Test described label" onDismiss={handleTestDismiss}>
        Test content
      </AlertDialog>,
    );

    getByRole('alertdialog', {
      description: 'Test content',
      name: 'Test described label',
    });
  });

  it('should be modal', async (): Promise<void> => {
    const { container, getByRole } = render(
      <>
        <button>First button</button>
        <AlertDialog label="Test modal label" onDismiss={handleTestDismiss}>
          <button>Second button</button>
        </AlertDialog>
        ,<button>Third button</button>
      </>,
    );

    const dismissButton: HTMLElement | null = container.querySelector(
      '[aria-label="Dismiss"]',
    );
    assert(dismissButton !== null);
    const secondButton: HTMLElement = getByRole('button', {
      name: 'Second button',
    });
    expect(window.document.activeElement).toBe(secondButton);
    await USER.tab();
    expect(window.document.activeElement).toBe(dismissButton);
    await USER.tab();
    expect(window.document.activeElement).toBe(secondButton);
    await USER.tab();
    expect(window.document.activeElement).toBe(dismissButton);
  });
});
