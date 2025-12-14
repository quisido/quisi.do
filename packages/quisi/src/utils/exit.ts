import debug from './debug.js';
import mapToString from './map-to-string.js';

const EXIT_HANDLERS = new Set<() => Promise<void> | void>();

export const onExit = (callback: () => Promise<void> | void): void => {
  EXIT_HANDLERS.add(callback);
};

const handleExitError = (err: unknown): void => {
  debug(`An error occurred while exiting: ${mapToString(err)}`);
};

export const handleExit = async (): Promise<void> => {
  const promises: Promise<void>[] = [];

  for (const callback of EXIT_HANDLERS) {
    try {
      const result: Promise<void> | void = callback();
      if (result instanceof Promise) {
        promises.push(result.catch(handleExitError));
      }
    } catch (err: unknown) {
      handleExitError(err);
    }
  }

  await Promise.allSettled(promises);
};
