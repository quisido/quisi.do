import { identity } from 'fmrs';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

const EMPTY = 0;
const STATE_SETTERS = new Map<string, ReadonlySet<(value: unknown) => void>>();

const isState = <T>(value: SetStateAction<T>): value is T =>
  typeof value !== 'function';

export default function useLocalStorage(
  key: string,
  parse?: undefined,
  stringify?: undefined,
): readonly [string | null, Dispatch<SetStateAction<string | null>>];
export default function useLocalStorage<T>(
  key: string,
  parse: (value: string) => T,
  stringify: (value: T) => string,
): readonly [T | null, Dispatch<SetStateAction<T | null>>];
export default function useLocalStorage<T = string>(
  key: string,
  // @ts-expect-error: If `parse` is `undefined`, then `T` is `string`.
  parse: ((value: string) => T) | undefined = identity,
  // @ts-expect-error: If `stringify` is `undefined`, then `T` is `string`.
  stringify: ((value: T) => string) | undefined = identity,
): readonly [T | null, Dispatch<SetStateAction<T | null>>] {
  // States
  const [stateValue, setStateValue] = useState<T | null>(null);

  // Callbacks
  const setLocalStorageValue = useCallback(
    (action: SetStateAction<T | null>): void => {
      const setValues = (newStateValue: T | null): void => {
        // Set in local storage.
        if (newStateValue === null) {
          window.localStorage.removeItem(key);
        } else {
          const newLocalStorageValue: string = stringify(newStateValue);
          window.localStorage.setItem(key, newLocalStorageValue);
        }

        // Execute callbacks.
        const setStates: ReadonlySet<(value: unknown) => void> | undefined =
          STATE_SETTERS.get(key);
        if (typeof setStates === 'undefined') {
          throw new Error(
            `Expected at least one component to be subscribed to local storage item "${key}".`,
          );
        }

        for (const setState of setStates) {
          setState(newStateValue);
        }
      };

      if (isState(action)) {
        setValues(action);
        return;
      }

      const newValue: T | null = action(stateValue);
      setValues(newValue);
    },
    [key, stateValue, stringify],
  );

  // Effects
  useLayoutEffect((): void => {
    if (typeof window === 'undefined') {
      return;
    }

    const localStorageValue: string | null = window.localStorage.getItem(key);
    if (localStorageValue === null) {
      return;
    }

    const newStateValue: T = parse(localStorageValue);
    setStateValue(newStateValue);
  }, [key, parse]);

  // If another component changes the value,
  useEffect((): VoidFunction => {
    // We're trusting that this function will only be called with `T`.
    const handleChange = (newStateValue: unknown): void => {
      setStateValue(newStateValue as T);
    };

    const setStates: ReadonlySet<(value: unknown) => void> | undefined =
      STATE_SETTERS.get(key);
    if (typeof setStates === 'undefined') {
      STATE_SETTERS.set(key, new Set([handleChange]));
    } else {
      STATE_SETTERS.set(key, new Set([...setStates, handleChange]));
    }

    return (): void => {
      const oldStateSetters: ReadonlySet<(value: unknown) => void> | undefined =
        STATE_SETTERS.get(key);
      if (typeof oldStateSetters === 'undefined') {
        return;
      }

      const newStateSetters = new Set<(value: unknown) => void>(
        oldStateSetters,
      );
      newStateSetters.delete(handleChange);
      if (newStateSetters.size === EMPTY) {
        STATE_SETTERS.delete(key);
      } else {
        STATE_SETTERS.set(key, newStateSetters);
      }
    };
  }, [key]);

  // If another tab changes the value,
  useEffect((): VoidFunction => {
    const handleStorage = ({
      key: eventKey,
      newValue: newLocalStorageValue,
    }: StorageEvent): void => {
      if (eventKey !== key) {
        return;
      }

      if (newLocalStorageValue === null) {
        setStateValue(null);
        return;
      }

      const newStateValue: T = parse(newLocalStorageValue);
      setStateValue(newStateValue);
    };

    window.addEventListener('storage', handleStorage);
    return (): void => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [key, parse]);

  return useMemo(
    (): readonly [T | null, Dispatch<SetStateAction<T | null>>] => [
      stateValue,
      setLocalStorageValue,
    ],
    [setLocalStorageValue, stateValue],
  );
}
