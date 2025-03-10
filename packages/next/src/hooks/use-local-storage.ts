import { identity } from 'fmrs';
import {
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
): readonly [string | null, Dispatch<SetStateAction<string | null>>];
export default function useLocalStorage<T>(
  key: string,
  parse: (value: string) => T,
): readonly [T | null, Dispatch<SetStateAction<T | null>>];
export default function useLocalStorage<T = string>(
  key: string,
  // @ts-expect-error: If `parse` is `undefined`, then `T` is `string`.
  parse: ((value: string) => T) | undefined = identity,
): readonly [T | null, Dispatch<SetStateAction<T | null>>] {
  // States
  const [value, setValue] = useState<T | null>(null);

  // Effects
  useLayoutEffect((): void => {
    if (typeof window === 'undefined') {
      return;
    }

    const item: string | null = window.localStorage.getItem(key);
    if (item === null) {
      return;
    }

    const newValue: T = parse(item);
    setValue(newValue);
  }, [key, parse]);

  // If another component changes the value,
  useEffect((): VoidFunction => {
    // We're trusting that this function will only be called with `T`.
    const handleChange = (newValue: unknown): void => {
      setValue(newValue as T);
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
    const handleStorage = ({ key: eventKey, newValue }: StorageEvent): void => {
      if (eventKey !== key) {
        return;
      }

      if (newValue === null) {
        setValue(null);
        return;
      }

      const parsed: T = parse(newValue);
      setValue(parsed);
    };

    window.addEventListener('storage', handleStorage);
    return (): void => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [key, parse]);

  return useMemo((): readonly [
    T | null,
    Dispatch<SetStateAction<T | null>>,
  ] => {
    return [
      value,
      (action: SetStateAction<T | null>): void => {
        const setValues = (newValue: T | null): void => {
          const setStates: ReadonlySet<(value: unknown) => void> | undefined =
            STATE_SETTERS.get(key);
          if (typeof setStates === 'undefined') {
            throw new Error(
              `Expected at least one component to be subscribed to local storage item "${key}".`,
            );
          }

          for (const setState of setStates) {
            setState(newValue);
          }
        };

        if (isState(action)) {
          setValues(action);
          return;
        }

        const newValue: T | null = action(value);
        setValues(newValue);
      },
    ];
  }, [key, value]);
}
