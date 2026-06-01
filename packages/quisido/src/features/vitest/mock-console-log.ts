import { type MockInstance, vi } from 'vitest';
import toString from '../../utils/to-string.js';

type Procedure<
  A extends readonly unknown[] = readonly unknown[],
  R = unknown,
> = (...args: A) => R;

const createThrowyFunction = <A extends readonly unknown[]>(
  name: string,
): Procedure<A, never> => {
  return (...messages: A): never => {
    const message: string = messages.map(toString).join(' ');
    throw new Error(message, { cause: name });
  };
};

const spyOn = <A extends readonly unknown[], R, K extends string>(
  name: string,
  object: Record<K, Procedure<A, R>>,
  key: K,
): (() => void) => {
  const mockedImpl: Procedure<A, never> = createThrowyFunction(name);
  const mockInstance: MockInstance = vi
    // @ts-expect-error Not sure why the spyOn type is wylin'.
    .spyOn(object, key)
    .mockImplementation(mockedImpl);

  return (): void => {
    mockInstance.mockRestore();
  };
};

const MOCKED_PROCEDURES = new Set<Procedure>();

export const mockConsoleLog = (): void => {
  const restoreDebug: Procedure = spyOn('console.debug', console, 'debug');
  MOCKED_PROCEDURES.add(restoreDebug);

  const restoreError: Procedure = spyOn('console.error', console, 'error');
  MOCKED_PROCEDURES.add(restoreError);

  const restoreInfo: Procedure = spyOn('console.info', console, 'info');
  MOCKED_PROCEDURES.add(restoreInfo);

  const restoreLog: Procedure = spyOn('console.log', console, 'log');
  MOCKED_PROCEDURES.add(restoreLog);

  const restoreWarn: Procedure = spyOn('console.warn', console, 'warn');
  MOCKED_PROCEDURES.add(restoreWarn);
};

export const restoreConsoleLog = (): void => {
  for (const restoreProcedure of MOCKED_PROCEDURES) {
    restoreProcedure();
    MOCKED_PROCEDURES.delete(restoreProcedure);
  }
};
