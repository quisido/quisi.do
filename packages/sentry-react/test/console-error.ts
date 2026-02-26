import { vi } from 'vitest';

const consoleError = window.console.error.bind(console);

export const mockConsoleError = (): void => {
  window.console.error = vi.fn();
};

export const restoreConsoleError = (): void => {
  window.console.error = consoleError;
};
