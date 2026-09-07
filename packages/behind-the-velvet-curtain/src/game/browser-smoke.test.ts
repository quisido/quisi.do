import { describe, expect, it, vi } from 'vitest';
import { bootGame } from './boot.js';

const captureWindowErrors = (): unknown[] => {
  const errors: unknown[] = [];

  window.addEventListener('error', (event: ErrorEvent): void => {
    errors.push(event.error ?? event.message);
  });

  window.addEventListener(
    'unhandledrejection',
    (event: PromiseRejectionEvent): void => {
      errors.push(event.reason);
    },
  );

  return errors;
};

const isMainMenuReady = (): boolean => {
  const root = document.querySelector('visual-novel');
  const mainScreen = document.querySelector('[data-screen="main"]');
  const startButton = document.querySelector('[data-action="start"]');

  return (
    root !== null &&
    mainScreen?.classList.contains('active') === true &&
    startButton !== null
  );
};

const waitForMainMenu = async (): Promise<void> => {
  await expect.poll(isMainMenuReady).toBe(true);
};

describe('bootGame', (): void => {
  it('boots Monogatari and renders the main menu', async (): Promise<void> => {
    // Monogatari emits expected first-run diagnostics. This test captures
    // browser errors directly instead of treating all console output as errors.
    vi.restoreAllMocks();
    document.body.innerHTML = '<div id="monogatari"></div>';

    const errors = captureWindowErrors();

    await bootGame('#monogatari');
    await waitForMainMenu();

    const root = document.querySelector('visual-novel');
    const mainScreen = document.querySelector('[data-screen="main"]');
    const startButton = document.querySelector('[data-action="start"]');

    expect(root).not.toBeNull();
    expect(mainScreen?.classList.contains('active')).toBe(true);
    expect(startButton).not.toBeNull();
    expect(errors).toHaveLength(0);
  });
});
